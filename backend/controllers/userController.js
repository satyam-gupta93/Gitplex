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

const login = async (req, res) => {
  const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({ token, userId: user._id });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).send("Server error!");
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        console.error("Error during fetching:", err.message);

        res.status(500).send("Server error!");
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
        return res.status(404).json({ message: "User not found!" });
        }

        res.json(user);
    } catch (err) {
        console.error("Error during fetching:", err.message);
        res.status(500).send("Server error!");
    }
};

const updateUserProfile = async (req, res) => {
    const { email, password } = req.body;

    try {
        let updateFields = { email };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        ).select("-password");

        if (!user) {
        return res.status(404).json({ message: "User not found!" });
        }

        res.json(user);
    } catch (err) {
        console.error("Error during updating:", err.message);
        res.status(500).send("Server error!");
    }
};

const deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
        return res.status(404).json({ message: "User not found!" });
        }

        res.json({ message: "User Profile Deleted!" });
    } catch (err) {
        console.error("Error during deleting:", err.message);
        res.status(500).send("Server error!");
    }
};


export {getAllUsers,signup,login,getUserProfile,updateUserProfile,deleteUserProfile}