
import api from "../constants/api"

export const getChartData = async () => {

    try{
        
        const api_response = await api.get('/chartData'.trim() , {
            withCredentials : true
        })
        

        if(api_response.status === 200){

            console.log(api_response);

            return api_response.data.data

        }else if(api_response.status === 401){
            return null
        }else{
            return null
        }
    }catch(err){

        console.log("Error occured in get_Message_Body api *****");
        console.log(err);
        return null;
    }
}