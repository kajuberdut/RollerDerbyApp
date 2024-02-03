import React, { useEffect } from "react";
import './Home.css'
import { Link } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle, Button } from "reactstrap";

/**
 * Display home page
 */

function Home({setIsHomeVis}) {

  /** Get user from context*/

  const user = JSON.parse(localStorage.getItem('user'));

  /** When home page is mounted setIsloginVis to true - false when unmounted */

  useEffect(() => {
    setIsHomeVis(true);
  return () => {
    setIsHomeVis(false);
  };
  }, []);

  /** Render home page */

    return (
      <section className="col-md-8 Home">
        <Card>
          <CardTitle className="Home-Title">
              <h1>The block party begins when the star arrives.</h1>
          </CardTitle>
          <CardBody >
            {user && <h2>Welcome to the party, {user.username}!</h2>}
            {!user && <CardText>
              <Link className="Home-Link" to="/login"><Button>Login</Button></Link>
              <Link className="Home-Link" to="/signup"><Button>Signup</Button></Link>
            </CardText>
            }
          </CardBody>
        </Card>
      </section>
    )
}

export default Home;
