import ApiResponse from "../utils/ApiReponses.js";
import dbService from "../utils/dbService.js";
import dataModel from "../model/chartData.js";

const webhookController = {

    updateData : async (req , res) => {
        console.log(req.body)

        console.log(await dbService.find(dataModel))
        return new ApiResponse(res).successful()
    }
}

export default webhookController;