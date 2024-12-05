import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import SignUp from "./pages/SignIn";
import SignIn from "./pages/SignUp";
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
        const date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); 
        const expires = "expires=" + date.toUTCString();

          if(Gender){
            document.cookie = `gender=${Gender}; ${expires}; SameSite=None; Secure`
          }

          if(Age){
            document.cookie = `age=${JSON.stringify(age)}; ${expires} SameSite=None; Secure`
          }

          if(DateRange){
            document.cookie = `date_range=${JSON.stringify(DateRange)}; ${expires} SameSite=None; Secure`
          }
          
          if(PermissionForStoringCookies){
            document.cookie = `permission_for_storing_cookie=${PermissionForStoringCookies}; ${expires}`
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