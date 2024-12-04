import moment from "moment";
import { useState } from "react";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import { dateRange, endDate, startDate } from "../../atoms/dateRange";
import { useRecoilState, useRecoilValue } from "recoil";

const DateRangePicker = () => {
  let [start, setstart] = useRecoilState(startDate);
  let [end, setend] = useRecoilState(endDate);

  console.log("newDateRange is : ", useRecoilValue(dateRange));
  const [ranges, setRanges] = useState({
    "Today Only": [moment(start), moment(end)],
    "Yesterday Only": [
      moment(start).subtract(1, "days"),
      moment(end).subtract(1, "days"),
    ],
    "3 Days": [moment(start).subtract(3, "days"), moment(end)],
  });

  let applyCallback = (startDate: any, endDate: any) => {
    setstart(startDate);
    setend(endDate);
  };

  let local = {
    format: "DD-MM-YYYY HH:mm",
    sundayFirst: false,
  };

  console.log(start, end);

  if (ranges) {
    return (
      <DateTimeRangeContainer
        ranges={ranges}
        start={start}
        end={end}
        local={local}
        applyCallback={applyCallback}
      >
        <button>select date</button>
      </DateTimeRangeContainer>
    );
  } else {
    return <>Loading..</>;
  }
};

export default DateRangePicker;
