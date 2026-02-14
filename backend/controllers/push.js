import fs from "fs/promises";
import path from "path"
import cloudinary from "../config/cloudinary-config.js";

const  pushRepo = async () => {
  const repoPath = path.resolve(process.cwd(), ".gitPlex");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath);

    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);

        await cloudinary.uploader.upload(filePath, {
          resource_type: "raw",
          public_id: `commits/${commitDir}/${file}`,
          overwrite: true
        });
      }
    }

    console.log("All commits pushed to Cloudinary");
  } catch (err) {
    console.error("Error pushing to Cloudinary:", err);
  }
}

export {pushRepo};
