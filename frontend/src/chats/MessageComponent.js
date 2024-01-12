// import React, { useState, useContext, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import UserContext from "../UserContext";
// import FastApi from "../../Api";
// import "./MessageComponent.css";
// import {
//     Card,
//     CardBody,
//     CardTitle,
//     CardText,
//     Button
//   } from "reactstrap";

  

  
//   /**  
//   * Card component for bouts, mixers, events and users. 
//   */

//   // function CardComponent({mixer, bout, event, user}) {
//   function CardComponent({mixer, bout, event}) {

//     /** Get user from context, set button, and disable in state, and determine if dealing with bout or mixer*/

//     // const [ button, setButton ] = useState("Apply");
//     // const [ disable, setDisable ] = useState(false);
//     let info = bout !== undefined ? bout : mixer;
//     let type = bout !== undefined ? "bouts" : "mixers";
//     console.log("info:", info)
//     // let key = bout !== undefined ? bout.eventId : mixer.eventId;
//     let key = info.eventId
//     // ! note will need to change this back to eventId after you solve that problem in api 
//     console.log("***key***", key)

//     // let id = "Card-Component-";
//     // let key = id + keyInfo;


  
//     const { user } = useContext(UserContext); 
//     const [address, setAddress ] = useState([]); 
    
//   //   /** API get request for a specific address */ 

//     async function getAddress() {
//       let address = await FastApi.getAddress(info.addressId)
//       console.log("address:", address)
//       setAddress(address)
//       // setIsLoading(false)
//     }
    

//     useEffect(() => {
//       getAddress();
//     }, [bout, mixer]);


//     // let timeObj = new Time(info.time)
//     // let hours = timeObj.getHours()
//     // console.log("hours:", hours)
    
//     // let userTime = 

    
//     /** Reloading jobs when it changes request for users applications */

//     // useEffect(() => {

//     //   if(job) {
//     //     const isApplied = user.applications.includes(job.id);
//     //     setButton(isApplied ? "Applied" : "Apply");
//     //     setDisable(isApplied);
//     //   }
//     // }, [user.applications]);


//     /** Handle click of button  */

//     // async function handleClick(e) {
//     //   e.preventDefault(); 

//     //   let result = await apply(user.username, job.id); 

//     //   if(result.success) {
//     //     setButton("Applied");
//     //     setDisable(true);
//     //     user.applications.push(job.id);
//     //   } 

//     // }

//      /** Render the card component */
      
//       return (
//           <section key={"Card-Component-" + key}>
//             <Card className="CardComponent"> 
//               <CardBody>
//                   <NavLink exact to={`/${type}/${key}`} className="CompanyCard-Link" style={{color: '#555555', }}>
//                 <CardTitle className="text-center CardComponent-Title">
//                   <h3>{info.theme}</h3>
//                 </CardTitle>
//                   </NavLink>
//                  <CardTitle> 
              
//                  <h5>{address.city}, {address.state}</h5>
//                  </CardTitle>
//                  <CardText className="CardComponent-Text">
//                  {info.date}
//                 </CardText>
//                  <CardText className="CardComponent-Text">
//                   {info.description}
//                 </CardText>
//                 {/* <CardText className="CardComponent-Text">
//                 {info. && `equity: ${info.equity} `}
//                 </CardText>
//                 <CardText className="CardComponent-Text">
//                 {info.salary && `salary: ${info.salary}`}
//                 </CardText> */}
//                   {/* {job && <Button className={`CardComponent-Button`}onClick={handleClick} disabled={disable}>{button}</Button>} */}
//               </CardBody>
//             </Card>
//          </section>
//         );
//   }
  
//   export default CardComponent
