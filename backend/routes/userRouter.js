import express from  "express";
import { deleteUserProfile, getAllUsers, getUserProfile, login, signup, updateUserProfile } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/allUsers",getAllUsers);
userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.get("/userProfile",getUserProfile)
userRouter.put("/updateProfile",updateUserProfile);
userRouter.delete("/deleteProfile",deleteUserProfile);


export default userRouter;

