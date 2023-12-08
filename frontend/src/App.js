import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter } from "react-router-dom";
import Nav from "./navBar/NavBar";
import AllRoutes from "./routes/Routes";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Fragment>
          <Nav />
          <main>
            {/* <Routes login={login} signup={signup} update={update} apply={apply} /> */}
            <AllRoutes />
          </main>
        </Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
