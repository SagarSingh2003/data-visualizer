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

    const date_range = req.cookies.date_range;
    const age = req.cookies.age;
    const gender = req.cookies.gender;

    let data = {
      uuid: uuid,
    };

    if (date_range) {
      data.date_range = date_range;
    }

    if (age) {
      data.age = age;
    }

    if (gender) {
      data.gender = gender;
    }

    try {
      await dbService.create(SharedData, data);
      return new ApiResponse(res).successful(`${uuid}`);
    } catch (err) {
      return new ApiResponse(res).internalServerError();
    }
  },
};

export default shareController;
