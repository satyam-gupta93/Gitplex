

const getAllUsers = (req,res) =>{
    res.send("All user fetched!");
}

const signup = (req,res) =>{
    res.send("Sign Up!");
}

const login = (req,res) =>{
    res.send("Loging in!");
}

const getUserProfile = (req,res) =>{
    res.send("Profile fetched!");
}

const updateUserProfile = (req,res) =>{
    res.send("Profile Updated!");
}

const deleteUserProfile = (req,res) =>{
    res.send("Profile deleted");
}

export {getAllUsers,signup,login,getUserProfile,updateUserProfile,deleteUserProfile}