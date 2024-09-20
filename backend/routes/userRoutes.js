import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUsersByID,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

router.route("/").post(registerUser).get(getUsers);

router.post("/logout", logoutUser);

router.post("/login", loginUser);

router.route("/profile").get(getUserProfile).put(updateUserProfile);

router.route("/:id").delete(deleteUser).get(getUsersByID).put(updateUser);

export default router;
