import express from "express";
import shareController from "../controller/shareController.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.post("/", shareController.share);

router.get("/:id", authMiddleware , shareController.getPrefs);

export default router;
