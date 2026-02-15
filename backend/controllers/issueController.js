
const createIssue = (req,res) =>{
    res.send("Issue created!");
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
