import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import dbService from "../utils/dbService.js";
import UserData from "../model/userdata.js";
import ApiResponse from "../utils/ApiReponses.js";
dotenv.config();

const privateKey = process.env.Private_key;

const authMiddleware = async (req, res, next) => {

  const access_token = req.cookies.access_token;

  console.log(access_token);

  if (access_token) {
    try {
      const decodedData = jwt.verify(access_token, privateKey);

      if (decodedData && decodedData.email) {
        try {
          const userData = await dbService.findOne(UserData, {
            email: decodedData.email,
          });

          if (!userData) {
            return new ApiResponse(res).notFound();
          }

          req.userData = userData;

          next();
        } catch {
          return new ApiResponse(res).internalServerError(
            "some error occured please try again"
          );
        }
      } else {
        return new ApiResponse(res).unauthorized("Invalid token data");
      }
    } catch (error) {
      console.error("JWT verification error:", error);
      return new ApiResponse(res).unauthorized("Token verification failed");
    }
  } else {
    return new ApiResponse(res).unauthorized("Please sign up first");
  }
};


export const allowOriginMiddleware = async(req , res , next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'https://data-visualizer-nhkw.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 

    next()
}

export default authMiddleware;
