import webhook from "./route/webhooks.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DatabaseService from "./utils/dbService.js"
import ApiResponse from "./utils/ApiReponses.js";

dotenv.config();

const db_uri = process.env.MONGODB_URI;

const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.json());

app.use(cors());

app.get("/" , (req ,res) => {
  return new ApiResponse(res).successful();
})

app.use("/webhook" , webhook)

export let dbconn;

(async () => {

  dbconn =  await DatabaseService.connect(db_uri.toString());
  app.listen(PORT, () => {
    console.log("app listening on port", PORT);
  });
})();



export default app;