import { NavLink } from "react-router-dom";
import "./TeamComponent.css";


/**  
* Card component for teams
*/

function TeamComponent({ team }) {

    /** Render the team component */
      
    return (
      <div key={"TeamComponent-" + team.groupId } className="TeamComponent" style={{width: '77%', height: 'auto', borderRadius: '5px', bakgroundColor: '', paddingBottom: '10px' }}> 
       <NavLink to={`/teams/${team.groupId}`} className="TeamComponent-Link" style={{color: '#555555', textDecoration: 'none'}}>
        <div>
            <div style={{paddingTop: '8px', paddingLeft: '20px', paddingRight: '20px'}} >
            <h4 style={{paddingTop: '15px'}}>{team.name}</h4>
            </div>           
        </div>
        </NavLink>
      </div>
    );
  }
  
  export default TeamComponent
