import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateTimeInput = ({ LabelName, Selected, OnChange }) => (
    <>
        <label className="font-bold">{LabelName}</label>
        <DatePicker
            selected={Selected}
            onChange={OnChange}
            showTimeSelect
            timeFormat="HH:mm:ss" 
            dateFormat="yyyy/MM/dd HH:mm:ss"
            className="h-10 w-full rounded border p-2 pr-10 mb-4"
            placeholderText="sampling date"
        />
    </>
);

export default DateTimeInput;