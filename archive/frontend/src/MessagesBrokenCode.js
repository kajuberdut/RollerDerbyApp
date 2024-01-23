// import React, { useState, useEffect, useRef } from "react";
// import FastApi from "../Api";
// import { Card,CardBody, CardTitle, Form, Input, Button, CardHeader, CardText,   CardFooter } from "reactstrap";
// import { useLocation } from 'react-router-dom';

// function Messages({handleMessages }) {

//     const [otherUserId, setOtherUserId] = useState();

//     let INITIAL_STATE = { message: ""};
//     const [formData, setFormData] = useState(INITIAL_STATE);
//     const [userId, setUserId] = useState();
//     const location = useLocation();
//     const pathname = location.pathname;


//     useEffect(() => {
//       const user = JSON.parse(localStorage.getItem('user'));
//       setUserId(Number(user.userId));
//       let formOtherUserId = Number(pathname.split('/')[2]);
//       setOtherUserId(formOtherUserId)
//       console.log("FormOtherUserId in messages", formOtherUserId)
//    }, [])

  
//     return (
//       <Card className="Messages"  style={{height: '500px', width: '350px', position: 'fixed', bottom: '0px', right: '95px', borderRadius: '20px'}}>
//         <CardBody>
//         </CardBody>
//       </Card>              
//   )
// };

// export default Messages;

 // useEffect(() => {
    //   let formOtherUserId = Number(pathname.split('/')[2]);
    //   console.log("FormOtherUserId in messages", formOtherUserId)
    //   setOtherUserId(formOtherUserId)
    //   console.log("otherUserId in messages", otherUserId)
    
    // }, [pathname])

    // useEffect(() => {
    //   async function getOtherUserById() {
    //     console.log("---this should run once after otherUserId has been set")
    //     console.log("otherUserId WHERE API CALL SHOULD BE MADE", otherUserId)
    //   }
    //   // getOtherUserById()
    // }, [otherUserId])



/** On mount, retrieve user from local storage and set user id in state*/

    // useEffect(() => {
    //   const user = JSON.parse(localStorage.getItem('user'));
    //   console.log("user in local storage in messages:", user)
    //   setUserId(Number(user.userId));
    //   setUsername(user.username)

    //   const pathname = window.location.pathname;
    //   console.log("pathname in messages:", pathname)
    //   let formOtherUserId = Number(pathname.split('/')[2]);
    //   console.log("FormOtherUserId in messages", formOtherUserId)
    //   setOtherUserId(formOtherUserId)
    //   console.log("otherUserId in messages", otherUserId)
    // }, []);






    // /** On mount, retrieve user from local storage and set user id in state*/

    // // useEffect(() => {
    // //   const user = JSON.parse(localStorage.getItem('user'));
    // //   console.log("user in local storage in messages:", user)
    // //   setUserId(Number(user.userId));
    // //   setUsername(user.username)

    // //   const pathname = window.location.pathname;
    // //   console.log("pathname in messages:", pathname)
    // //   let formOtherUserId = Number(pathname.split('/')[2]);
    // //   console.log("FormOtherUserId in messages", formOtherUserId)
    // //   setOtherUserId(formOtherUserId)
    // //   console.log("otherUserId in messages", otherUserId)
    // // }, []);

    // const user = JSON.parse(localStorage.getItem('user'));
    // setUserId(Number(user.userId));
    // setUsername(user.username)

    // const pathname = window.location.pathname;
    // console.log("pathname in messages:", pathname)
    // let formOtherUserId = Number(pathname.split('/')[2]);
    // console.log("FormOtherUserId in messages", formOtherUserId)
    // setOtherUserId(formOtherUserId)
    // console.log("otherUserId in messages", otherUserId)



    // // useEffect(() => {
    // //   console.log("debugging userId in useeffect messages")
    // //   console.log("!!!! otherUserId:", otherUserId)
    // //   // ! this is returning undefined and should NOT BE UNDEFINED
    // // }, [otherUserId]);

    // useEffect(() => {
    //   async function getOtherUserById() {
    //     console.log("this should run once after otherUserId has been set")
    //     // try {
    //     //   console.log("^^^!!!!!!!!!!!!!!!!!!!!!!!!!^^^^^^ other user id IN FUNCTION USEEFFECT:", otherUserId)
    //     //   // ! this is returning undefined and should NOT BE UNDEFINED
    //     //   let otherUser =  await FastApi.getOtherUser(otherUserId);
    //     //   console.log("other user !!!", otherUser)
    //     //   setOtherUser(otherUser);
    //     // } catch (errors) {
    //     //   console.error("Get Other User failed", errors);
    //     //   return { success: false, errors };
    //     // }
    //   }
    //   getOtherUserById()
    // }, [otherUserId])


    


  
//     return (
//         <Card className="Messages"  style={{height: '500px', width: '350px', position: 'fixed', bottom: '0px', right: '95px', borderRadius: '20px'}}>
//           <CardBody>
//           </CardBody>
//         </Card>              
//     )
// };
  
// export default Messages;


