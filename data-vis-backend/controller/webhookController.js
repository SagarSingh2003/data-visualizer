import dbService from "../utils/dbService.js";
import DataRecord from "../model/chartData.js";
import ApiResponse from "../utils/ApiReponses";

const webhookController = {

    updateData : async (req , res) => {
        
        const data = req.body?.updatedData
        await dbService.deleteMany(DataRecord);
        await dbService.insertMany(DataRecord , data)
        return new ApiResponse(res).successful()
    
    }
}

export default webhookController;