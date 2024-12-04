import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { gender } from "./atoms/gender";
import { age } from "./atoms/age";
import { dateRange } from "./atoms/dateRange";
import { askPermissionForStoringCookies } from "./atoms/askPermissionForStoringCookies";
import { useRecoilValue } from "recoil";


function App() {

  const Gender = useRecoilValue(gender);
  const Age = useRecoilValue(age);
  const DateRange = useRecoilValue(dateRange);
  const PermissionForStoringCookies = useRecoilValue(askPermissionForStoringCookies)

  useEffect(() => {

      if(PermissionForStoringCookies){
          
          if(Gender){
            document.cookie = `gender=${Gender}`
          }

          if(Age){
            document.cookie = `age=${JSON.stringify(age)}`
          }

          if(DateRange){
            document.cookie = `date_range=${JSON.stringify(DateRange)}`
          }
        
      }

  } , [Gender , Age , DateRange , PermissionForStoringCookies]);

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App