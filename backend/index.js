import yargs  from "yargs";
import {hideBin} from "yargs/helpers"
import { initRepo } from "./controllers/inti.js";
import { addRepo } from "./controllers/add.js";
import { commitRepo } from "./controllers/commit.js";
import { pushRepo } from "./controllers/push.js";
import { pullRepo } from "./controllers/pull.js";
import { revertRepo } from "./controllers/revert.js";
import { argv } from "process";
import dotenv from "dotenv";
import connectDB from "./config/mongodbConfig.js";
import express from "express"
import cors from "cors"
import http from "http"
import bodyParser from "body-parser";
import { Server } from "socket.io";
import mongoose from "mongoose";
import mainRouter from "./routes/mainRouter.js";



dotenv.config();


yargs(hideBin(process.argv))
     .command("start", "Starts a new server", {}, startServer)
    .command('init',"Initialise a new repository",{},initRepo)
    .command(
        "add <file>",
        "Add a file to the repository",
        (yargs) => {
        yargs.positional("file", {
            describe: "File to add to the staging area",
            type: "string",
        });
        },
        (argv) =>{
            addRepo(argv.file);
        }
     )
    .command(
        "commit <message>",
        "Commit the staged files",
        (yargs) => {
        yargs.positional("message", {
            describe: "Commit message",
            type: "string",
        });
        },
        (argv) =>{
            commitRepo(argv.message);
        }
    )
    .command("push", "Push commits to S3", {}, pushRepo)
    .command("pull", "Pull commits from S3", {}, pullRepo)
    .command(
        "revert <commitID>",
        "Revert to a specific commit",
        (yargs) => {
        yargs.positional("commitID", {
            describe: "Comit ID to revert to",
            type: "string",
        });
        },
        (argv) =>{
            revertRepo(argv.commitID);
        }
        
    )
    .demandCommand(1, "You need at least one command")
    .help().argv



function startServer() {
  
    const app = express();
    const port = process.env.PORT ||  3000;

    app.use(bodyParser.json());
    app.use(express.json());

    app.use(cors({
        origin:"*"   
    }))

    app.use("/",mainRouter);

    connectDB();




    let user = "test";

    const httpServer = http.createServer(app);

      const io = new Server(httpServer, {
        cors: {
        origin: "*",
        methods: ["GET", "POST"],
        },
    });

      io.on("connection", (socket) => {
        socket.on("joinRoom", (userID) => {
        user = userID;
        console.log("------");
        console.log(user);
        console.log("------");
        socket.join(userID);
        });
    });

    const db = mongoose.connection;

    db.once("open", async () => {
        console.log("Data layer ready for operations.");
    });

    httpServer.listen(port,()=>{
         console.log(`Server is running on PORT ${port}`);
    })




  
  
}
