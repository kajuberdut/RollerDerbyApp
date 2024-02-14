import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import About from './About';
import { jest } from '@jest/globals'

// * Passing as of 2/13/24
// npm test Profile.test.js
// must be in frontend directory 


afterEach(() => {
  cleanup()
})

const mockSetAboutVis = jest.fn();

describe("About Content Tests", () => {

    test('renders about page title ', () => {
      render(
        <BrowserRouter> 
            <About setIsAboutVis={mockSetAboutVis}/>
        </BrowserRouter>
      );
      const title = screen.getByText('Set Goals, Achieve Dreams, Seek Adventure'); 
      expect(title).toBeInTheDocument();
    });
  
    test('renders about page work content', () => {
      render(
        <BrowserRouter> 
            <About setIsAboutVis={mockSetAboutVis}/>
        </BrowserRouter>
      );
      const workContent = screen.getByText('I created Block Party because I realized there was a need for better networking and communication within the roller derby community. My mission is to assist people coming together and playing one of the greatest sports on earth.'); 
      expect(workContent).toBeInTheDocument();
    });

    test('renders about page play content', () => {
        render(
          <BrowserRouter> 
              <About setIsAboutVis={mockSetAboutVis}/>
          </BrowserRouter>
        );
        const playContent = screen.getByText('I love to spend time in the outdoors. I hike and backpack with my dog Riva who is a Rhodesian Ridgeback. In 2022, I spent a month backpacking through Ireland. I also enjoy kayaking and paddleboarding both on flat water and white water. When I commit to something, I am all in and give 110%.'); 
        expect(playContent).toBeInTheDocument();
      });

    test('renders about page derby content', () => {
        render(
          <BrowserRouter> 
              <About setIsAboutVis={mockSetAboutVis}/>
          </BrowserRouter>
        );
        const derbyContent = screen.getByText('Derby'); 
        expect(derbyContent).toBeInTheDocument();
      });

})
