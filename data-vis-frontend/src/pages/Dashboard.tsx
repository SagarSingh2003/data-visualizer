import React, { useEffect} from "react";
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
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { askPermissionForStoringCookies } from "../atoms/askPermissionForStoringCookies";
import { chartData, filteredData } from "../atoms/chartData";
import moment from "moment";
import { endDate, startDate } from "../atoms/dateRange";
import Header from "../ui/Components/Header";
import { selectedBar } from "../atoms/selectedBar";
import { Popup } from "../ui/Components/Popup";
import { frontendApi } from "../constants/frontend-api";
import { currUuid } from "../atoms/currUuid";
import { popupOpen } from "../atoms/popupOpen";
import { age } from "../atoms/age";
import { gender } from "../atoms/gender";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {


  const selectedbar = useRecoilValue(selectedBar)
  const chartdata = useRecoilValue(chartData);

  if (!chartdata) {
    return <>Loading data...</>;
  }

  const currid = useRecoilValue(currUuid)
  const setAge = useSetRecoilState(age)
  const setGender = useSetRecoilState(gender)
  const [permissionForStoringCookies, setAskPermissionForStoringCookies] =
    useRecoilState<true | false | null>(askPermissionForStoringCookies);

  const setStartDate = useSetRecoilState(startDate);
  const setEndDate = useSetRecoilState(endDate);
  const setFiltered = useSetRecoilState(filteredData);

  function calculateDefaultStartAndEndDate() {

    setStartDate(moment(new Date(chartdata[0]?.day)));
    setEndDate(moment(new Date(chartdata[chartdata?.length - 1]?.day)));
    setFiltered(chartdata);
  }

  useEffect(() => {
    if (chartdata?.length != 0) {
      calculateDefaultStartAndEndDate();
    }
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useRecoilState(popupOpen);
  
  function getCookie(cookieName: string) {
    let cookieValue = document.cookie;

    let cookieArray = cookieValue.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookiePair = cookieArray[i].trim();

      if (cookiePair.startsWith(cookieName + "=")) {
        return decodeURIComponent(cookiePair.substring(cookieName.length + 1));
      }
    }

    return null;
  }

  useEffect(() => {
    const cookieVal = getCookie("permission_for_storing_cookie");

    if (cookieVal) {
      setAskPermissionForStoringCookies(Boolean(cookieVal));
    }
  }, []);


  console.log("gender cookie: ", `gender=${getCookie("gender")};`);

  return (
    <div>
      {permissionForStoringCookies === null ? (
        <section className="popup-cookies">
          <div>
            <h3>Can we store cookies , to provide you with better experience?</h3>
            <button
              onClick={() => {
                setAskPermissionForStoringCookies(true);
              }}
            >
              yes
            </button>
            <button
              onClick={() => {
                setAskPermissionForStoringCookies(false);
              }}
            >
              no
            </button>
          </div>
        </section>
      ) : null}
      <div style={{ fontFamily: "Arial" }}>
        <Header />

        <section className="charts">
          <div>
            <BarChart />
          </div>

          <div style={{ padding: "20px" }}>
          <h2>Time Trend Analaysis of {selectedbar}</h2>
            <LineChart title="Time Trend Analysis" />
          </div>
        </section>

        <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Welcome!"
      >
        <div className="space-y-4">
          <p className="text-gray" style={{fontSize : "14px" , color: "#22a7f2"}} onClick={() => {
            window.location.href = (`${frontendApi}/${currid}`)
          }}>
            {frontendApi}/{currid}
          </p>
          <div className="button-container" style={{marginTop: "20px"}}>
            <button  onClick={() => setIsPopupOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </Popup>
      </div>
    </div>
  );
};

export default Dashboard;
