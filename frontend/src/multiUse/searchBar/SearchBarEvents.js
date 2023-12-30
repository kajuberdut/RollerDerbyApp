import './SearchBarEvents.css'
import React, { useState } from 'react'
import {
  Form,
  Label, 
  Input
} from "reactstrap";


/**
 * Display search bar
 */

function SearchBar({formDataSB, setFormDataSB}) {

    /** Update local state with current state of input element */

    const handleChange = evt => {
        const { name, value }= evt.target;
        // setFormData(fData => ({
          setFormDataSB(fData => ({
          ...fData,
          [name]: value,
        }));
        console.log("formDataSB in SearchBar:", formDataSB)
      };

    /** Render search bar */

    return (
        <div className='SearchBar' >
          <div className='SearchBar-City'>
          {/* <Label htmlFor="city" sm={2} className="mb3"> </Label> */}
          <Input 
              type="text"
              placeholder="City"
              onChange={handleChange}
              value={formDataSB.city} 
              id="city" 
              name="city"
              className='SearchBarInput'
              />
          </div>
          
          <div className='SearchBar-State'>
          {/* <Label htmlFor="state" sm={2} className="mb3"> </Label> */}
              <Input
                  type="select"
                  placeholder="State"
                  onChange={handleChange}
                  id="state" 
                  name="state"
                  className='SearchBarInput'
                  value={formDataSB.state}
                  maxLength={2}
                  >
                  <option value="">State</option>
                  <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AZ">AZ</option>
                  <option value="AR">AR</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DE">DE</option>
                  <option value="DC">DC</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="HI">HI</option>
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="IA">IA</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="ME">ME</option>
                  <option value="MD">MD</option>
                  <option value="MA">MA</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MS">MS</option>
                  <option value="MO">MO</option>
                  <option value="MT">MT</option>
                  <option value="NE">NE</option>
                  <option value="NV">NV</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>
                  <option value="NY">NY</option>
                  <option value="NC">NC</option>
                  <option value="ND">ND</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PA">PA</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WV">WV</option>
                  <option value="WI">WI</option>
                  <option value="WY">WY</option>
                  {/* </Col> */}
                  </Input>
              </div>

          <div className='SearchBar-ZipCode'>
          {/* <Label htmlFor="zipCode" sm={2} className="mb3"> </Label> */}
          <Input 
              type="number"
              placeholder="Zip Code"
              onChange={handleChange}
              value={formDataSB.zipCode} 
              id="zipCode" 
              name="zipCode"
              className='SearchBarInput'
              maxLength={5}
              />
          </div>
        </div>
    );
  }
  
  export default SearchBar;