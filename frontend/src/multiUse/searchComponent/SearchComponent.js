import './SearchComponent.css'
import React, { useState, useEffect } from 'react'
import { Form } from "reactstrap";
import DatePick from '../datePicker/DatePicker';
import SearchBar from '../searchBar/SearchBarEvents';
import FastApi from '../../Api';

/**
 * Display search component 
 */

function SearchComponent({setBouts, setMixers}) {

    /** Sets initial state of component */
  
    const INITIAL_STATE = {city: "", state: "", zipCode: "", startDate: null, endDate: null};
    const INITIAL_STATE_DP = {startDate: null, endDate: null};
    const INITIAL_STATE_SB = {city: "", state: "", zipCode: ""};

    /** Sets formData in initial state */

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formDataDP, setFormDataDP] = useState(INITIAL_STATE_DP);
    const [formDataSB, setFormDataSB] = useState(INITIAL_STATE_SB); 


    /** Determines if searching bouts or mixers */

    let type = setBouts !== undefined ? "bout" : "mixer";
    let setData = setBouts !== undefined ? setBouts : setMixers;

    /** Handle submit formating date picker data*/
    
    const handleSubmit = evt => {
        evt.preventDefault();
        if(formDataDP.startDate !== null && formDataDP.endDate !== null) {
            let forStartDate = new Date(formDataDP.startDate).toISOString().slice(0, 10);
            formDataDP.startDate = forStartDate
            let forEndDate = new Date(formDataDP.endDate).toISOString().slice(0, 10);
            formDataDP.endDate = forEndDate
        }
    
        setFormData({ ...formDataDP, ...formDataSB })
    };


    /** Deletes item if key is null and calls getData */

    useEffect(() => {
        for (const key in formData) {
            if (formData[key] === null || formData[key] === "") {
            delete formData[key];
            }
        }
        getData(formData);
    }, [formData]);

    /** API get request for events */

    async function getData(formData) {

        try{
            let events = await FastApi.getEvents(type, formData)
            setData(events);
        } catch(errors) {
            return { success: false, errors };
        }

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