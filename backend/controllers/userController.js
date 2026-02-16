import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";


const signup = async (req, res) => {
  const { username, password, email } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            repositories: [],
            followedUsers: [],
            starRepos: [],
        });

        await newUser.save();

        const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
        );

        res.json({ token, userId: newUser._id });
    } catch (err) {
        console.error("Error during signup:", err.message);
        res.status(500).send("Server error");
    }
};




const getAllUsers = (req,res) =>{
    res.send("All user fetched!");
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