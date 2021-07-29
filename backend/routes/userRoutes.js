import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
  getUser
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.get("/", getUser);

router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);

export default router;
