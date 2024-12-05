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

    const router= useNavigate();

    const setStartDate = useSetRecoilState(startDate)

    const setEndDate = useSetRecoilState(endDate)

    const setAge = useSetRecoilState(age)

    const setGender = useSetRecoilState(gender)

    const setError = useSetRecoilState(error)

    const getPrefData  = () =>{
        
        axios.get(api + `/share/${id}` , {
            withCredentials : true
        }).then((res) => {
            
            if(res.status === 401){
                router('/signup')
            }else if(res.status === 200){
                console.log(res , "response");
                setAge(res?.data?.age)
                setGender(res?.data?.gender)
                setStartDate(JSON.parse(res?.data?.data_range?.start))
                setEndDate(JSON.parse(res?.data?.data_range?.end))
            }else{
                setError(error);
            }
            
        })
    }


    useEffect(() => {
        getPrefData()
    })

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
