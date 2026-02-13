import yargs  from "yargs";
import {hideBin} from "yargs/helpers"
import { initRepo } from "./controllers/inti.js";
import { addRepo } from "./controllers/add.js";

yargs(hideBin(process.argv))
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
        addRepo
     )
    .demandCommand(1, "You need at least one command")
    .help().argv