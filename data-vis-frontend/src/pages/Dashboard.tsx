import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "react-date-range/dist/styles.css"; // Date picker styles
import "react-date-range/dist/theme/default.css"; // Default theme
import LineChart from "../ui/Components/LineChart";
import BarChart from "../ui/Components/BarChart";
import DateRangePicker from "../ui/Components/DateRangePicker";
import { useRecoilState } from "recoil";
import { age } from "../atoms/age";
import { gender } from "../atoms/gender";
import { askPermissionForStoringCookies } from "../atoms/askPermissionForStoringCookies";
import axios from "axios";
import { api } from "../constants/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

const Dashboard: React.FC = () => {

 
 
 


  const [ageFilter, setAgeFilter] = useRecoilState<"15-25" | ">25"| null>(age);
  const [genderFilter, setGenderFilter] = useRecoilState<"Male" | "Female"| null>(gender);
  const [permissionForStoringCookies , setAskPermissionForStoringCookies] = useRecoilState<true | false | null>(askPermissionForStoringCookies)


  

  function getCookie(cookieName:string) {

    let cookieValue = document.cookie;
  
    let cookieArray = cookieValue.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) {
  
      let cookiePair = cookieArray[i].trim();
  
      if (cookiePair.startsWith(cookieName + '=')) {
  
        return decodeURIComponent(cookiePair.substring(cookieName.length + 1));
  
      }
  
    }
  
    return null;
  
  } 

  useEffect(() => {
    const cookieVal = getCookie("permission_for_storing_cookie")

    if(cookieVal){
      setAskPermissionForStoringCookies(Boolean(cookieVal))
    }
  } , [])

  return (
    

    <div>
      {permissionForStoringCookies === null ? 

        
        <section className="popup">
            <div>
                <h3>Permission ?</h3>
                <button onClick={() => {
                  setAskPermissionForStoringCookies(true);
                }}>yes</button>
                <button onClick={() => {
                  setAskPermissionForStoringCookies(false);
                }}>no</button>
            </div>
        </section>
        : 
        null
      }
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Dashboard</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div>
          <label>Age Filter:</label>
          <select
            value={ageFilter as string}
            onChange={(e) => setAgeFilter(e.target.value as "15-25" | ">25")}
          >
            <option value="15-25">15-25</option>
            <option value=">25">&gt;25</option>
          </select>
        </div>
        <div>
          <label>Gender Filter:</label>
          <select
            value={genderFilter as string}
            onChange={(e) => setGenderFilter(e.target.value as "Male" | "Female")}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      <div>
        <DateRangePicker />
      </div>

      <div>
          <button onClick={ async () => {
             const res = await  axios.post(`${api}/share` , {
                  uuid : uuidv4() 
              } , {
                headers : {
                  "Content-Type" : "application/json"
                }
              })

              console.log(res);
          }}>
              share
          </button>
      </div>
      <div>
        <BarChart />
      </div>

    <div style={{ padding: "20px" }}>
      <h2>Line Chart Example</h2>
      <LineChart title="Time Trend Analysis" />
    </div>
    </div>
    </div>
  );
};

export default Dashboard;
