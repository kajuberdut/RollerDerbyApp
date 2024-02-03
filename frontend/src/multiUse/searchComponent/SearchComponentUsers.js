import './SearchComponentUsers.css'
import React, { useState } from 'react'
import { Form } from "reactstrap";
import SearchBarUsers from '../searchBar/SearchBarUsers';
import FastApi from '../../Api';

/**
 * Display search component users
 */

function SearchComponentUsers({ setUsers }) {

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
        
        getData(formData);
        setFormData(INITIAL_STATE);
    };

    /** API get request for users */

    async function getData(formData) {
        try{
            let users = await FastApi.getUsers(formData)
            setUsers(users);
        } catch(errors) {
            return { success: false, errors };
        }
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