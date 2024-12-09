import { useRecoilState } from "recoil";
import { currUuid } from "../../atoms/currUuid";
import api from "../../constants/api";
import {v4 as uuidv4} from "uuid";
import { popupOpen } from "../../atoms/popupOpen";

const Share = () => {


    const [_, setIsPopupOpen] = useRecoilState(popupOpen);
  
    const [__, setCurrUuid] = useRecoilState(currUuid);
    
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
      
    return (
       
      <div>
      <button

          className="share"
        onClick={async () => {

        
          const data = {
            gender: getCookie("gender"),
            age: getCookie("age"),
            date_range: getCookie("date_range"),
          };
          console.log(data);
          const res = await api.post(
            `/share`,
            {
              uuid: uuidv4(),
              ...data,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          setCurrUuid(res.data.msg);
          setIsPopupOpen(true) 
        }}
      >
        share
      </button>
    </div> 
    )
}

export default Share;