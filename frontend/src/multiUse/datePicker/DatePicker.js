import DatePicker from 'react-datepicker'
import "./DatePicker.css"
import React, { useState, useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css'
import format from "date-fns/format";
import { parseISO } from 'date-fns';


/**
 * Display date picker 
 */
function DatePick({formDataDP, setFormDataDP}) {
// function DatePick({formData, setFormData}) {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()


    // * Note: This is just here for debugging purposes. 
    useEffect(() => {
        console.log("FORM DATA In DatePicker", formDataDP);
    }, [endDate]);


    const handleChange = (range) => {
    
        const [startDate, endDate] = range;
        

        // setStartDate(moment(startDate).format("YYYY-MM-DD"));
        // setStartDate(format(date, "yyyy/MM/dd", { awareOfUnicodeTokens: true }))
        // let newDate = date('Y-m-D',strtotime(startDate));
        // let newDate = Date.parse(startDate);
        // const parsedStartDate = parseISO(startDate)

        // let forStartDate = new Date(startDate).toISOString().slice(0, 10);


        // let forEndDate = new Date(endDate).toISOString().slice(0, 10);
        // let newData = 

        // console.log("newDate:", newDate)
        // console.log("forStarDate:", forStartDate)
        // console.log("forEndDate:", forEndDate)



        // setStartDate(forStartDate);
        console.log("you are hitting this point")
        // setEndDate(forEndDate);
        setStartDate(startDate);
        
        setEndDate(endDate);

        console.log("you are hitting after setEndDate")
        //! change the snake_case to camelCase 
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
            // format='yyyy-MM-dd'
            // isClearable
            // calendarClassName='calandar'
            />
        </div>

    );
  }
  
  export default DatePick;

  
    // const handleChange = (range) => {
    //     const [startDate, endDate] = range;
    //     // setStartDate(startDate);
    //     // setEndDate(endDate);
    //     setFormData(startDate)
    //     setFormData(endDate)
    //     console.log("formData:", formData)
    //   };

     // const handleChange = (range) => {
    //     const [startDate, endDate] = range;
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         startDate,
    //         endDate,
    //     }));
    // };