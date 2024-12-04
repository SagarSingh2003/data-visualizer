import webhook from "./route/webhooks.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./route/auth.js";
import DatabaseService from "./utils/dbService.js";
import ApiResponse from "./utils/ApiReponses.js";
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/auth.js";
import shareRoute from "./route/shareRoute.js";
import chartDataRoute from "./route/chartData.js";

dotenv.config();

const db_uri = process.env.MONGODB_URI;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(cors());

app.use("/webhook", webhook);

app.get("/", (req, res) => {
  return new ApiResponse(res).successful();
});

app.use("/auth", authRoute);

app.use("/chartData", chartDataRoute);

app.use("/share", shareRoute);

app.use(authMiddleware);

// protected routes**


export let dbconn;

(async () => {
  dbconn = await DatabaseService.connect(db_uri.toString());
  app.listen(PORT, () => {
    console.log("app listening on port", PORT);
  });
})();

export default app;
