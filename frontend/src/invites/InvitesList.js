import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import Loading from "../multiUse/loading/Loading"
import './InvitesList.css'
import { Card, CardBody, CardTitle } from "reactstrap";
// import TeamForm from "../forms/TeamForm";
import InviteComponent from "./InviteComponent";

/**
 * Display invites list page
 */

function InvitesList() {

    /** Set invites and is loading in state*/

    const [isLoading, setIsLoading] = useState(true);
    const [invites, setInvites] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

  /** API get request for invites */

  async function getInvites() {

    try {
      let invites = await FastApi.getInvites(user.userId);
      console.log("users in inviteslist !!!!!!!!!!!!!!!  ", invites)
      setInvites(invites)
      setIsLoading(false)
    } catch (errors) {
      return { success: false, errors };
    }
  }

   /** Reloads invites when changes request for invites */

    useEffect(() => {
        getInvites();
    }, []);


  /** Display loading if API call is has not returned */

    if (isLoading) {
      return (
          <Loading />
      )
    }

  /** Render the cards for users*/

    const renderCards = () => {
      return (
        <div className="TeamList-RenderCards">
                {invites.map(invite => (
                  <InviteComponent invite={invite} key={"Invite-" + invite.inviteId} />           
                ))}
          </div>
        );
    }
  
  /** Render search bar and cards */

    return (
      <div className="Invites">
      {/* <SearchComponentUsers getUsers={getUsers} setUsers={setUsers}/> */}
      <Card className="InvitesList" style={{width: '400px'}}>
        <CardBody>
        <CardTitle><h1>Invites</h1></CardTitle>
        {invites && <div> {renderCards()} </div> }
        {invites.length === 0 && <div>No pending invites.</div>}
        </CardBody>
      </Card>
      </div>
    );

}

export default InvitesList;