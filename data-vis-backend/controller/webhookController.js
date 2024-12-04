import dbService from "../utils/dbService.js";
import DataRecord from "../model/chartData.js";
import ApiResponse from "../utils/ApiReponses.js";

const webhookController = {
  updateData: async (req, res) => {
    const data = req.body?.updatedData;
    await dbService.deleteMany(DataRecord);
    await dbService.insertMany(DataRecord, data);
    console.log("update successful");
    return new ApiResponse(res).successful();
  },
};

export default webhookController;
