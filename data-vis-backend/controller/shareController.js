import SharedData from "../model/sharedData.js";
import ApiResponse from "../utils/ApiReponses.js";
import dbService from "../utils/dbService.js";

const shareController = {
  getPrefs: async (req, res) => {
    const id = req.params.id;

    if (!id) {
      return new ApiResponse(res).badRequest(
        400,
        "bad request please enter a valid url"
      );
    }

    try {
      const userPref = await dbService.findOne(SharedData, { uuid: id });

      if (!userPref) {
        return new ApiResponse(res).notFound();
      }

      return new ApiResponse(res).successful(
        "user preferences found",
        userPref
      );
    } catch (err) {
      return new ApiResponse(res).internalServerError();
    }
  },

  share: async (req, res) => {
    const uuid = req.body.uuid;

    const date_range = req.body.date_range;
    const age = req.body.age;
    const gender = req.body.gender;


    console.log("cookies",req.cookies.gender);
    let data = {
      uuid: uuid,
      date_range: date_range?.toString(),
      age: age?.toString(),
      gender: gender?.toString()
    };

    try {
      await dbService.create(SharedData, data);
      return new ApiResponse(res).successful(`${uuid}`);
    } catch (err) {
      return new ApiResponse(res).internalServerError();
    }
  },
};

export default shareController;
