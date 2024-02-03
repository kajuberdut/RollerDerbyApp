import { NavLink } from "react-router-dom";
import "./TeamComponent.css";


/**  
* Card component for teams
*/

function TeamComponent({ team }) {

    /** Render the team component */
      
    return (
      <div key={"TeamComponent-" + team.groupId } className="TeamComponent" style={{width: '77%', height: '90px', borderRadius: '5px', bakgroundColor: ''}}> 
       <NavLink to={`/teams/${team.groupId}`} className="TeamComponent-Link" style={{color: '#555555', textDecoration: 'none'}}>
        <div style={{ display: 'flex'}}>
            <div style={{paddingTop: '8px', paddingLeft: '20px', paddingRight: '20px'}} >
            <h4 style={{paddingTop: '30px'}}>{team.name}</h4>
            </div>           
        </div>
        </NavLink>
      </div>
    );
  }
  
  export default TeamComponent
