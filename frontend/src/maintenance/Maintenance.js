import React from 'react';
import { Card, CardBody, CardText, CardTitle } from "reactstrap";

const Maintenance = () => {

return (
    <section className="col-md-8 Home" style={{minWidth: '400px'}}>
      <Card>
        <CardTitle className="Maintenance Title">
            <h1>Block Party is currently under maintenance.</h1>
        </CardTitle>
        <CardBody>
            <CardText>
            Expected downtime: 1 hour 30 mins.
          </CardText>
        </CardBody>
      </Card>
    </section>
  )
};

export default Maintenance;