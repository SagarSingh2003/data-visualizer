import express from "express";
import authController from "../controller/authController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/signup",  authController.signUp);

router.post("/signin", authController.signIn);

router.post("/signout", authMiddleware, authController.signOut);

export default router;
