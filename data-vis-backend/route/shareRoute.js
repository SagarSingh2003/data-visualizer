import express from "express";
import shareController from "../controller/shareController.js";

const router = express.Router();

router.post("/", shareController.share);

router.get("/:id", shareController.getPrefs);

export default router;
