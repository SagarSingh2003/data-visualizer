import React, { useEffect} from "react";
import { Bar} from "react-chartjs-2";
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
import { chartData, filteredData } from "../../atoms/chartData";
import { useRecoilState, useRecoilValue } from "recoil";
import { endDate, startDate } from "../../atoms/dateRange";
import moment from "moment";
import { gender } from "../../atoms/gender";
import { age } from "../../atoms/age";
import { selectedBar } from "../../atoms/selectedBar";


ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);


const Dashboard: React.FC = () => {





  const chartdata = useRecoilValue(chartData);

  if(!chartdata){
    return <>Loading data...</>
  }

  console.log("chart data is : " ,chartdata);

    const [startdate , setStartDate] = useRecoilState(startDate);
    const [enddate , setEndDate] = useRecoilState(endDate);
    const Gender = useRecoilValue(gender);
    const [filtered , setFiltered] = useRecoilState(filteredData)
    const Age = useRecoilValue(age);

   function calculateDefaultStartAndEndDate(){

        setStartDate(moment(new Date(chartdata[0]?.day)))
        setEndDate(moment(new Date(chartdata[chartdata?.length - 1]?.day)))
        setFiltered(chartdata)
    }

  useEffect(() => {
    if(chartdata?.length != 0){
        calculateDefaultStartAndEndDate()
    }
  } , [])

  const [selectedbar, setSelectedBar] = useRecoilState<any>(selectedBar);

  const featureData = {
     A  : 0,
     B : 0,
     C : 0,
     D : 0,
     E : 0,
     F : 0
  }


  useEffect(() => {
    if(Gender && !Age){
        
        const filtereddata = chartdata.filter((data : any) => {
            return data.gender.trim() === Gender.trim()
        })

        setFiltered(filtereddata);
  }else if( Age && !Gender){
    
        const filtereddata = chartdata.filter((data : any) => {
            return data.age.trim() === Age.trim()
        })

        setFiltered(filtereddata)
  }else if( Age && Gender){

    const filtereddata = chartdata?.filter((data : any) => {
        return ((data.age.trim() === Age.trim()) && data.gender.trim() === Gender.trim()) 
    })

    setFiltered(filtereddata)
  }


  } , [Gender , Age])


  if(filtered?.length != 0 && startdate && enddate){
        
        for(let i = 0 ; i < filtered?.length ; i++){

            if(startdate.diff(new Date(filtered[i]?.day) , "day") <= 0 && enddate.diff(new Date(filtered[i].day) , "day") >= 0){
                featureData.A += filtered[i]["A"]
                featureData.B += filtered[i]["B"]
                featureData.C += filtered[i]["C"]
                featureData.D += filtered[i]["D"]
                featureData.E += filtered[i]["E"]
                featureData.F += filtered[i]["F"]
            }
        }

        
  }

  console.log(featureData);
  const  barData = [featureData["A"] , featureData["B"] , featureData["C"] , featureData["D"] , featureData["E"] , featureData["F"]];
  const  labels = ["A" , "B" , "C" , "D" , "E" , "F"]; 

  const handleBarClick = (barIndex: number) => {
    setSelectedBar(labels[barIndex]); 
  };




  console.log(selectedbar);

  const barChartData = {
    type: "horizontalBar",
    labels: labels,
    datasets: [
      {
        label: "Total Time Spent in units",
        data: barData,
        backgroundColor: labels.map((_, i) =>
          i === labels.indexOf(selectedbar) ? "orange" : "blue"
        ),
      },
    ],
  };





  return (
    <div >
      <div style={{ width: "80%", margin: "20px auto" }}>
        <h4>Feature Analysis</h4>
        <Bar
          data={barChartData}
          options={{
            responsive: true,
            indexAxis  : "y" as const,
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Units of Time Spent on Features within the selected Date Range --------->",
                  
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Features ------------>",
                },
              },
            },

            onClick: (_, elements) => {
              if (elements.length > 0) {
                const barIndex = elements[0].index;
                handleBarClick(barIndex);
              }
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
