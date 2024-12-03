import webhook from "./route/webhooks.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DatabaseService from "./utils/dbService.js"

dotenv.config();

const db_uri = process.env.MONGODB_URI;

const PORT = process.env.PORT || 3000;

const app = express();

DatabaseService.connect(db_uri);

app.use(express.json());

app.use(cors());

app.use("/webhook" , webhook);

app.listen(PORT, () => {
  console.log("app listening on port", PORT);
});
