import moment from "moment";
import { atom, selector } from "recoil";



let now = new Date();
let startt = moment(
  new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
);

let ends = moment(startt)
  .add(1, "days")
  .subtract(1, "seconds");


export const startDate = atom({
    key: "StartDate",
    default : startt
})

export const endDate = atom({
    key: "EndDate",
    default : ends 
})

export const dateRange = selector({
    key : 'DateRange',
    get : ({get}) => {
        return {
            start : get(startDate),
            end : get(endDate)
        }
    }
})