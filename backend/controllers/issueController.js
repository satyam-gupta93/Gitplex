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

const updateIssueById = async (req,res) =>{
     const { id } = req.params;
     const { title, description, status } = req.body;
    try {
        const issue = await Issue.findById(id);

        if (!issue) {
        return res.status(404).json({ error: "Issue not found!" });
        }

        issue.title = title;
        issue.description = description;
        issue.status = status;

        await issue.save();

        res.json(issue, { message: "Issue updated" });
    } catch (err) {
        console.error("Error during issue updation : ", err.message);
        res.status(500).send("Server error");
    }
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
