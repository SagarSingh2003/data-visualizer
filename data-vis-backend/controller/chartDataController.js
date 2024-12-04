import DataRecord from "../model/chartData.js";
import ApiResponse from "../utils/ApiReponses.js";
import dbService from "../utils/dbService.js";

const chartDataController = {
  getData: async (req, res) => {
    try {
      const chartData = await dbService.find(DataRecord);

      if (chartData && chartData.length != 0) {
        return new ApiResponse(res).successful(
          "chart data found successfully",
          chartData
        );
      } else {
        return new ApiResponse(res).internalServerError(
          "data pipeline not working"
        );
      }
    } catch (err) {
      return new ApiResponse(res).internalServerError();
    }
  },
};

export default chartDataController;
