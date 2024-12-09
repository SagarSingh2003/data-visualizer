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
import { useRecoilValue} from "recoil";
import Shared from "./pages/Shared";

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
            document.cookie = `gender=${Gender}; ${expires}; SameSite=none; Secure;`
          }

          if(Age){
            document.cookie = `age=${JSON.stringify(Age)}; ${expires} SameSite=none; Secure`
          }

          if(DateRange){
            document.cookie = `date_range=${JSON.stringify(DateRange)}; ${expires} SameSite=none; Secure`
          }
          
          if(PermissionForStoringCookies){
            document.cookie = `permission_for_storing_cookie=${PermissionForStoringCookies}; ${expires}`
          }
      }

  } , [Gender , Age , DateRange , PermissionForStoringCookies]);


  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Dashboard/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/:id" element={<Shared />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App