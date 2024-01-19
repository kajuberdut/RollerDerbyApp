import React from "react";
import { render, cleanup } from "@testing-library/react";
import Loading from "./Loading";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../../testUtils";



afterEach(() => {
  cleanup()
  console.log("afterEach is running")
})


describe("Loading tests", () => {

    test("renders loading page", () => {
      render(
        <BrowserRouter>
          <UserProvider user={null}>
              <Loading />
          </UserProvider>
        </BrowserRouter>,
      );
    
    }); 
  
    it("matches snapshot", function() {
      const { asFragment } = render(
        <BrowserRouter>
          <UserProvider user={null}>
              <Loading />
          </UserProvider>
        </BrowserRouter>,
      );
        expect(asFragment()).toMatchSnapshot();
    });

})
