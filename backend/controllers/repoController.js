import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

const createRepository = async (req, res) => {
    const { owner, name, issues, content, description, visibility } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ error: "Repository name is required!" });
        }

        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ error: "Invalid User ID!" });
        }

        const user = await User.findById(owner);
            if (!user) {
            return res.status(404).json({ error: "Owner user not found!" });
        }

            const existingRepo = await Repository.findOne({ owner, name });
            if (existingRepo) {
                return res
                    .status(400)
                    .json({ error: "You already have a repository with this name!" });
            }

        const newRepository = new Repository({
            name,
            description,
            visibility,
            owner,
            content,
            issues,
        });

        const result = await newRepository.save();

        res.status(201).json({
        message: "Repository created!",
        repositoryID: result._id,
        });
    } catch (err) {
        console.error("Error during repository creation:", err.message);
        res.status(500).send("Server error");
    }
};
const getAllRepositories = async (req, res) => {
    try {
        const repositories = await Repository.find()
        .populate("owner", "-password")
        .populate("issues");

        res.json(repositories);
    } catch (err) {
        console.error("Error during fetching repositories:", err.message);
        res.status(500).send("Server error");
    }
    
};

const fetchRepositoryById = async (req, res) => {
    try {
        const repository = await Repository.findById(req.params.id)
        .populate("owner", "-password")
        .populate("issues");

        if (!repository) {
        return res.status(404).json({ message: "Repository not found!" });
        }

        res.json(repository);
    } catch (err) {
        console.error("Error during fetching repository:", err.message);
        res.status(500).send("Server error");
    }
};

const fetchRepositoryByName = async (req, res) => {
    try {
        const repositories = await Repository.find({ name: req.params.name })
        .populate("owner", "-password")
        .populate("issues");

        res.json(repositories);
    } catch (err) {
        console.error("Error during fetching repository:", err.message);
        res.status(500).send("Server error");
    }
};


const fetchRepositoryForCurrentUser = (req,res) =>{
    res.send("Repositories for Logged in user fetched!");
}

const updateRepositoryById = (req,res) =>{
    res.send("Repository Updated!");
}

const deleteRepositoryById = (req,res) =>{
    res.send("Repository Deleted!");
}

const toggleVisibilityById = (req,res) =>{
    res.send("Visibility toggled!");
}


export {createRepository,fetchRepositoryById,getAllRepositories,fetchRepositoryForCurrentUser,updateRepositoryById,deleteRepositoryById,toggleVisibilityById,fetchRepositoryByName}