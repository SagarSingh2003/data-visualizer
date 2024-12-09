import { useEffect } from "react";
import BarChart from "../ui/Components/BarChart";
import LineChart from "../ui/Components/LineChart";
import  api  from "../constants/api";
import { useRecoilState, useRecoilValue} from "recoil";
import { endDate, startDate } from "../atoms/dateRange";
import { age } from "../atoms/age";
import { gender } from "../atoms/gender";
import { useNavigate, useParams } from "react-router-dom";
import { error } from "../atoms/error";
import moment from "moment";
import Filter from "../ui/Components/Filters";
import { selectedBar } from "../atoms/selectedBar";
import { logout } from "../utils/sendAuth";

const Shared = () => {

    const {id} = useParams();

    const navigate= useNavigate();

    const [_ , setStartDate] = useRecoilState(startDate)

    const [__ , setEndDate] = useRecoilState(endDate)

    const [___ , setAge] = useRecoilState(age)

    const [____, setGender] = useRecoilState(gender)

    const [_____ , setError] = useRecoilState(error)



   const selectedbar = useRecoilValue(selectedBar)

    

    const getPrefData  = async () =>{
        

            try{

              const res = await api.get(`/share/${id}` , {
                withCredentials : true
              })


            if(res.status === 401){
                navigate("/signup")
            }else if(res.status === 200){

                try{
                    if(res?.data?.data.age){

                    setAge(JSON.parse(res?.data?.data?.age))

                    
                    }
                    
                    if(res?.data?.data?.gender){

                        setGender(res?.data?.data?.gender)
                    }
                    
                    if(res?.data?.data?.date_range?.trim()){
                        setStartDate(moment(JSON.parse(res?.data?.data?.date_range)?.start))
                        setEndDate(moment(JSON.parse(res?.data?.data?.date_range)?.end))    
                    }
                }catch(err){
                    console.log(err)
                }
            }else{
                setError(res.data);

            }

          }catch(err){
              console.log(err);
              navigate("/signup")
          }
       
    }


    useEffect(() => {
        getPrefData()
    } , [])

  return (
    <div>
      <div style={{ display : "flex" , width : "100%" , alignItems : "center" , justifyContent : "center"}}>
            <button 
                onClick = {() => {
                    logout()
                    navigate("/")
                }}
            >
                Logout
            </button>
          <Filter />
      </div>
      <section className="charts">
          <div>
            <BarChart />
          </div>

          <div style={{ padding: "20px" }}>
            <h2>Time Trend Analaysis of {selectedbar}</h2>
            <LineChart title="Time Trend Analysis" />
          </div>
      </section>
    </div>
  );
};

export default Shared;
