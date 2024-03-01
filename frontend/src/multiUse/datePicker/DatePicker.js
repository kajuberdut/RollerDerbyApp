import DatePicker from 'react-datepicker'
import "./DatePicker.css"
import React, { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css'

/**
 * Display date picker 
 */
function DatePick({formDataDP, setFormDataDP}) {

    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const handleChange = (range) => {
    
        const [startDate, endDate] = range;
    
        setStartDate(startDate);
        setEndDate(endDate);

        setFormDataDP((fData) => ({
          
          ...fData,
          start_date: startDate, // Include startDate in formData
          end_date: endDate, // Include endDate in formData
        }));
      };


   

    return (
        <div className='DatePicker'>
         <DatePicker  
            selected={date} 
            onChange={handleChange} 
            startDate={startDate}
            endDate={endDate}
            selectsRange
            placeholderText='Choose a date'
            dateFormat="yyyy-MM-dd"
            />
        </div>

    );
  }
  
  export default DatePick;
