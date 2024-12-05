import { useEffect } from "react";
import BarChart from "../ui/Components/BarChart";
import LineChart from "../ui/Components/LineChart";
import axios from "axios";
import { api } from "../constants/api";
import { useSetRecoilState } from "recoil";
import { endDate, startDate } from "../atoms/dateRange";
import { age } from "../atoms/age";
import { gender } from "../atoms/gender";
import { useNavigate, useParams } from "react-router-dom";
import { error } from "../atoms/error";

const Shared = () => {

    const {id} = useParams();

    const navigate= useNavigate();

    const setStartDate = useSetRecoilState(startDate)

    const setEndDate = useSetRecoilState(endDate)

    const setAge = useSetRecoilState(age)

    const setGender = useSetRecoilState(gender)

    const setError = useSetRecoilState(error)

    const getPrefData  = async () =>{
        
       try{
            const res = await axios.get(api + `/share/${id}` , {
                withCredentials : true
            })


            console.log("responseeell")
            console.log("response*******************", res);
            console.log("status " , res.status);
            if(res.status === 401){
                navigate("/signup")
            }else if(res.status === 200){
                console.log(res , "response");
                try{
                    setAge(res?.data?.age)
                    console.log(res?.data?.age)
                    setGender(res?.data?.gender)
                    setStartDate(JSON.parse(res?.data?.data_range)?.start)
                    setEndDate(JSON.parse(res?.data?.data_range)?.end)
                }catch(err){
                    console.log(err)
                }
            }else{
                setError(res.data);
            }

       }catch(err){
            console.log("error occured here" , err);
            navigate("/signup")
       }
            
            
       
    }


    useEffect(() => {
        getPrefData()
    } , [])

  return (
    <div>
      <div>
        <BarChart />
      </div>

      <div style={{ padding: "20px" }}>
        <h2>Line Chart Example</h2>
        <LineChart title="Time Trend Analysis" />
      </div>
    </div>
  );
};

export default Shared;
