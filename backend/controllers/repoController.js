
const createRepository = (req,res) =>{
   res.send("Repository created!");
}

const getAllRepositories = (req,res) =>{
    res.send("All repository fetched!");
}

const fetchRepositoryById = (req,res) =>{
    res.send("Repository Detail Fetched!");
}

const fetchRepositoryByName = (req,res) =>{
    res.send("Repository Detail Fetched!");
}

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