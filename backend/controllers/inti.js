import fs from "fs/promises";
import path from "path"


const initRepo = async () =>{
   const repoPath = path.resolve(process.cwd(), ".gitPlex");
   const commitsPath = path.join(repoPath, "commits");

    try {
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(commitsPath, { recursive: true });
        await fs.writeFile(
        path.join(repoPath, "config.json"),
        JSON.stringify({ bucket: process.env.S3_BUCKET })
        );
        console.log("Repository initialised!");
    } catch (err) {
    console.error("Error initialising repository", err);
  }
}



export {initRepo};