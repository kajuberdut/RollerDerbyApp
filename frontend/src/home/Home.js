// import React, { useContext } from "react";
// import UserContext from "../MultiUse/UserContext";
import './Home.css'
import { Link } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  CardText, 
  CardTitle,
  Button
} from "reactstrap";

/**
 * Display home page
 *
 */

function Home() {

  /** Get user from context*/

//   const { user } = useContext(UserContext);

  /** Render page */

    return (
      <section className="col-md-8 Home">
        <Card>
          <CardTitle>
                <h1>A Roller Communication Application</h1>
          </CardTitle>
          <CardBody >
            <CardText></CardText>
            {/* {user && <h2>Welcome Back, {user.firstName}!</h2>} */}
            {/* {user && <h2>Welcome Back</h2>} */}
            {/* { !user && ( <> <CardText>
              <Link className="Home-Link" to="/login"><Button>Login</Button></Link>
              <Link className="Home-Link" to="/signup"><Button>Signup</Button></Link>
            </CardText>
            </>)} */}
            <CardText>
              <Link className="Home-Link" to="/login"><Button>Login</Button></Link>
              <Link className="Home-Link" to="/signup"><Button>Signup</Button></Link>
            </CardText>
          </CardBody>
        </Card>
      </section>
    )
}

export default Home;
