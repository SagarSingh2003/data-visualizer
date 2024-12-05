
import axios from "axios";
import api from "../constants/api"

export const getChartData = async () => {

    try{
        
        const api_response = await api.get('/chartData'.trim() , {
            withCredentials : true
        })
        
        console.log(api_response);

        return api_response.data.data

    }catch(err){

        console.log("Error occured in get_Message_Body api *****");
        console.log(err);

    }
}