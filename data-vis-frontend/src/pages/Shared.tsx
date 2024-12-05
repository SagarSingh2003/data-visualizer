import { useEffect } from "react";
import BarChart from "../ui/Components/BarChart";
import LineChart from "../ui/Components/LineChart";
import axios from "axios";
import { api } from "../constants/api";
import { useSetRecoilState } from "recoil";
import { dateRange, endDate, startDate } from "../atoms/dateRange";
import { age } from "../atoms/age";
import { gender } from "../atoms/gender";

const Shared = ({id} : {id : string}) => {


    const setStartDate = useSetRecoilState(startDate)

    const setEndDate = useSetRecoilState(endDate)

    const setAge = useSetRecoilState(age)

    const setGender = useSetRecoilState(gender)

    const getPrefData  = () =>{
        
        axios.get(api + `/share/${id}` , {
            withCredentials : true
        }).then((res) => {
            
            setAge(res?.data?.age)
            setGender(res?.data?.gender)
            setStartDate(JSON.parse(res?.data?.data_range?.start))
            setEndDate(JSON.parse(res?.data?.data_range?.end))
            
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
