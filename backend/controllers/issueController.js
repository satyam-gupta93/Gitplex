import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";


const createIssue = async (req,res) =>{
    const { title, description } = req.body;
    const { id } = req.params;

    try {
        const issue = new Issue({
        title,
        description,
        repository: id,
        });

    await issue.save();

    res.status(201).json(issue);
    } catch (err) {
        console.error("Error during issue creation : ", err.message);
        res.status(500).send("Server error");
    }
}

const updateIssueById = (req,res) =>{
    res.send("Issue Updated!");
}

const deleteIssueById = (req,res) =>{
    res.send("Issue Updated!");
}

const getAllIssue = (req,res) =>{
    res.send("All Issue Feteched!");
}

const getIssueById = (req,res) =>{
    res.send("Issue Details Feteched!");
}

export {createIssue,updateIssueById,deleteIssueById,getAllIssue,getIssueById};
