import fs from "fs/promises";
import path from "path";
import cloudinary from "../config/cloudinary-config.js";

const pullRepo = async () => {
  const repoPath = path.resolve(process.cwd(), ".gitPlex");
  const commitsPath = path.join(repoPath, "commits");

  try {
    
    await fs.mkdir(commitsPath, { recursive: true });

   
    const result = await cloudinary.search
      .expression("public_id:commits/*")
      .max_results(500)
      .execute();

    const files = result.resources;

    if (!files || files.length === 0) {
      console.log("No commits found in Cloudinary.");
      return;
    }

    for (const file of files) {
      const publicId = file.public_id; 
     

      const relativePath = publicId.replace("commits/", "");
      const localFilePath = path.join(commitsPath, relativePath);

     
      await fs.mkdir(path.dirname(localFilePath), { recursive: true });

     
      const response = await fetch(file.secure_url);
      const buffer = Buffer.from(await response.arrayBuffer());

     
      await fs.writeFile(localFilePath, buffer);

      console.log("Pulled:", publicId);
    }

    console.log("All commits pulled from Cloudinary");
  } catch (err) {
    console.error("Error pulling from Cloudinary:", err);
  }
};

export { pullRepo };
