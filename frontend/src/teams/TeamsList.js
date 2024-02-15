import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import Loading from "../multiUse/loading/Loading"
import './TeamsList.css'
import { Card, CardBody, CardTitle } from "reactstrap";
import TeamComponent from "./TeamComponent";
import InvitesList from "../invites/InvitesList";

/**
 * Display teams page
 */

function TeamsList({ getPendingInvites }) {

  /** Set Teams and is loading in state*/

  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState([]);

   /** Retrieve user from local storage */

  const user = JSON.parse(localStorage.getItem('user'));

  /** API get request for teams */

  async function getTeams() {

    try {

      let teams = await FastApi.getTeams(user.userId);
      console.log("teams:", teams)
      setTeams(teams)
      setIsLoading(false)
    } catch (errors) {

      return { success: false, errors };
    }
  }

  /** Reloads teams when changes request for teams */

  useEffect(() => {
      getTeams();
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
                {teams.map(team => (
                  <TeamComponent team={team} key={"Team-" + team.groupId} />           
                ))}
          </div>
        );
    }
  
  /** Render search bar and cards */

  return (
      <div className="Teams">
        <div>
          <a href='/teams/add'>
            <button style={{borderRadius: '4px'}}>Create Team</button>
          </a>
        </div>

        <div style={{display: 'flex'}}>
        <Card className="TeamsList" style={{minWidth: '400px'}}>
            <CardBody>
              <CardTitle><h1 style={{paddingBottom: '30px'}}>Teams</h1></CardTitle>
              {teams && <div> {renderCards()} </div> }
              {teams.length === 0 && <div>Sorry, you are not on any teams.</div>}
            </CardBody>
        </Card>

        <InvitesList getTeams={getTeams} getPendingInvites={getPendingInvites}/>

        </div>
      </div>
  );
}

export default TeamsList;