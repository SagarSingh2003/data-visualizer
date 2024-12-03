import express from "express";
import webhookController from "../controller/webhookController.js";

const router = express.Router();

router.post('/save-message' ,  webhookController.updateData);


export default router;