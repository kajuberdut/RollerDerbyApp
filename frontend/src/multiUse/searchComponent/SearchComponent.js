import './SearchComponent.css'
import React, { startTransition, useState, useEffect } from 'react'
import {
Form
} from "reactstrap";
import DatePick from '../datePicker/DatePicker';
import SearchBar from '../searchBar/SearchBarEvents';
import { getDefaultLocale } from 'react-datepicker';
import FastApi from '../../Api';

/**
 * Display search component 
 */

function SearchComponent({setBouts, setMixers}) {

    /** Set initial state, set for data as initial state*/
  
    const INITIAL_STATE = {city: "", state: "", zip_code: "", start_date: null, end_date: null};
    // const INITIAL_STATE = {city: "", state: ""};
    const [formData, setFormData] = useState(INITIAL_STATE);

    const INITIAL_STATE_DP = {start_date: null, end_date: null};

    const [formDataDP, setFormDataDP] = useState(INITIAL_STATE_DP); 

    const INITIAL_STATE_SB = {city: "", state: "", zip_code: ""};

    const [formDataSB, setFormDataSB] = useState(INITIAL_STATE_SB); 

    // let getEvents = getBouts !== undefined ? getBouts : getMixers; 
    let type = setBouts !== undefined ? "bout" : "mixer";
    let setData = setBouts !== undefined ? setBouts : setMixers;

    /** Handle submit, get API result for companies or jobs, set formData to initial state*/
    

    // useEffect(() => {
    //     const combinedFormData = { ...formDataDP, ...formDataSB };
    //     getData(combinedFormData);
    //   }, [formDataDP, formDataSB]);

    // const handleSubmit = async evt => {
        const handleSubmit = evt => {
        evt.preventDefault();
        if(formDataDP.start_date !== null && formDataDP.end_date !== null) {
            let forStartDate = new Date(formDataDP.start_date).toISOString().slice(0, 10);
            formDataDP.start_date = forStartDate
            let forEndDate = new Date(formDataDP.end_date).toISOString().slice(0, 10);
            formDataDP.end_date = forEndDate
        }
        
        // *note setting form data is taking time so I am using useEffect to run when formData has been changed 
        setFormData({ ...formDataDP, ...formDataSB })

        console.log(" $$$$$$$$$$ formData $$$$$$$$$$$$$:", formData)
        
        // ? reseting form to inital state is causing an issue so not reseting form currently
    //   setFormData(INITIAL_STATE);
    };

    useEffect(() => {
        for (const key in formData) {
            if (formData[key] === null || formData[key] === "") {
            delete formData[key];
            }
        }
        console.log("Form Data IN USE EFFECT", formData)
        getData(formData)
    }, [formData]);

    async function getData(formData) {
        console.log("formData ^^^^^^^^^^^^^^^^^^^", formData)
        let events = await FastApi.getEvents(type, formData)
        setData(events)
        console.log("events:", events)
        // * get all bouts or mixers search by location and date if provided 
    } 

    /** Render search component */

    return (
        <div className='SearchComponent'>
            <Form className="SearchComponentForm" onSubmit={handleSubmit}>
                <div className='SearchComponent-SB'>
                    <SearchBar  formDataSB={formDataSB} setFormDataSB={setFormDataSB} />
                </div>
                <div className='SearchComponent-DP'>
                    <DatePick formDataDP={formDataDP} setFormDataDP={setFormDataDP}/>
                </div>
                <div className='SearchComponent-Btn'>
                    <button className='SearchComponentButton'>Search</button>
                </div>
            </Form>
        </div>
    );
  }
  
  export default SearchComponent;