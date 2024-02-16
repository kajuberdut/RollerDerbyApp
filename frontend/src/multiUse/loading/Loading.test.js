import React from "react";
import { render } from "@testing-library/react";
import Loading from "./Loading";
import { BrowserRouter } from "react-router-dom";


describe("Loading tests", () => {

    test("renders loading page", () => {
      localStorage.setItem("user", null);
      render(
        <BrowserRouter>
              <Loading />
        </BrowserRouter>,
      );
    
    }); 
  
    it("matches snapshot", function() {
      localStorage.setItem("user", null);
      const { asFragment } = render(
        <BrowserRouter>
              <Loading />
        </BrowserRouter>,
      );
        expect(asFragment()).toMatchSnapshot();
    });

})
