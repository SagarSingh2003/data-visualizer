
import axios from "axios";
import {api} from "../constants/api"

export const getChartData = async () => {

    try{
        
        const API = `${ api }/chartData`.trim()

        const api_response = await axios.get(API , {
            withCredentials : true
        })
        
        console.log(api_response);

        return api_response.data.data

    }catch(err){

        console.log("Error occured in get_Message_Body api *****");
        console.log(err);

    }
}