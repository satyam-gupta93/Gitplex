import fs from "fs/promises";
import path from "path";
import cloudinary from "../config/cloudinary-config.js";

const revertRepo = async (commitID) => {
  const repoPath = path.resolve(process.cwd(), ".gitPlex");
  const commitsPath = path.join(repoPath, "commits");
  const workingDir = path.resolve(repoPath, "..");

  try {
   
    await fs.mkdir(commitsPath, { recursive: true });

  
    const result = await cloudinary.search
      .expression(`public_id:commits/${commitID}/*`)
      .max_results(500)
      .execute();

    const files = result.resources;

    if (!files || files.length === 0) {
      console.log("No files found for this commit.");
      return;
    }

    for (const file of files) {
      const fileName = file.public_id.split("/").pop();
      const localCommitFile = path.join(commitsPath, commitID, fileName);

     
      await fs.mkdir(path.dirname(localCommitFile), { recursive: true });

      
      const response = await fetch(file.secure_url);
      const buffer = Buffer.from(await response.arrayBuffer());

      
      await fs.writeFile(localCommitFile, buffer);

    
      await fs.copyFile(
        localCommitFile,
        path.join(workingDir, fileName)
      );
    }

    console.log(`Commit ${commitID} reverted successfully!`);
  } catch (err) {
    console.error("Unable to revert:", err);
  }
};

export { revertRepo };
