import ApiResponse from "../utils/ApiReponses.js";

const webhookController = {

    updateData : (req , res) => {
        console.log(req.body)
        return new ApiResponse(res).successful()
    }
}

export default webhookController;