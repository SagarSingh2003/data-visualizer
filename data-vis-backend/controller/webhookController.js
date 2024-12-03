import dbService from "../utils/dbService.js";
import DataRecord from "../model/chartData.js";

const webhookController = {

    updateData : async (req , res) => {
        
        const data = req.body?.updatedData
        await new dbService.deleteMany(DataRecord);
        await new dbService.insertMany(DataRecord , data)
        return new ApiResponse(res).successful()
    
    }
}

export default webhookController;