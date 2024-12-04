import express from "express";
import chartDataController from "../controller/chartDataController.js";

const router = express.Router();

router.get("/", chartDataController.getData);

export default router;
