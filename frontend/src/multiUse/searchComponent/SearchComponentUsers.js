import './SearchComponentUsers.css'
import React, { startTransition, useState, useEffect } from 'react'
import {
Form
} from "reactstrap";
import SearchBarUsers from '../searchBar/SearchBarUsers';
import FastApi from '../../Api';

/**
 * Display search component 
 */

function SearchComponentUsers({getUsers, setUsers}) {

    /** Set initial state, set for data as initial state*/
  
    const INITIAL_STATE = {city: "", state: "", username: ""};
    const [formData, setFormData] = useState(INITIAL_STATE);


    /** Handle submit, get API result for companies or jobs, set formData to initial state*/
    
    const handleSubmit = evt => {
        evt.preventDefault();

        for (const key in formData) {
            if (formData[key] === null || formData[key] === "") {
            delete formData[key];
            }
        }
        
        // *note setting form data is taking time so I am using useEffect to run when formData has been changed 
        getData(formData)

        console.log(" $$$$$$$$$$ formData $$$$$$$$$$$$$:", formData)
        setFormData(INITIAL_STATE);
    };


    async function getData(formData) {
        console.log("formData ^^^^^^^^^^^^^^^^^^^", formData)
        let users = await FastApi.getUsers(formData)
        setUsers(users)
        console.log("users:", users)
    } 

    /** Render search component */

    return (
        <div className='SearchComponent'>
            <Form className="SearchComponentForm" onSubmit={handleSubmit}>
                <div className='SearchComponent-SB'>
                    <SearchBarUsers  formData={formData} setFormData={setFormData} />
                </div>
                <div className='SearchComponent-Btn'>
                    <button className='SearchComponentButton'>Search</button>
                </div>
            </Form>
        </div>
    );
  }
  
  export default SearchComponentUsers;