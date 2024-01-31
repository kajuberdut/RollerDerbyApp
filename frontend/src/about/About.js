import React, { useRef, useEffect } from "react";
import "./About.css"
import { CardGroup, Card, CardBody, CardTitle, CardText } from "reactstrap";

function About() {

    return (
       
        <div className="About" style={{paddingTop: '100px', paddingLeft: '10%', paddingBottom: '200px'}}>
        <div>
            <span style={{fontSize: '30px'}}>About the Creator:</span>
            <h1> Set Goals, Achieve Dreams, Seek Adventure</h1>
        </div>
        <CardGroup className="About-Cards scroll" style={{width: '88%', marginTop: '50px'}}>
            <Card className="Work" style={{width: '200px', margin: '1rem', border: '3px solid rgb(221, 221, 221)', borderRadius: '10px', boxShadow: '0 0 2px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.3)'}}> 
            <img
            alt="Roller Derby Player SockHer Blue"
            src="/work.jpg"/>
           
                <CardBody>
                    <CardTitle>
                        <h1>Work</h1>
                    </CardTitle>
                    <CardText>
                        I created Block Party because I realized there was a need for better networking and communication within the roller derby community. I am hoping to provide a community to assist people coming together and playing one of the greatest games on earth.
                        <br></br>

                        I am a passioniate software engineer who enjoys solving real world problems with creative solutions. I have spent the past 14 months developing and honing my skills in frontend web development, backend web development and databases. If you appreciate Block Party and believe it has value, please consider sharing my name (Sophia Macik) and my LinkedIn with anyone you know that may be hiring. I am actively job searching. I would also love to connect with you via LinkedIn. 
                        <br></br>

                        <div style={{marginTop: '20px'}}>
                            <a href="https://www.linkedin.com/in/sophiamacik/">
                                <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></img>
                            </a>
                        </div>

                    </CardText>
                </CardBody>
            </Card>

            <Card className="Play" style={{margin: '1rem', border: '3px solid rgb(221, 221, 221)', borderRadius: '10px', boxShadow: '0 0 2px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.3)'}}> 
            <img
            alt="Roller Derby Player SockHer Blue"
            src="/play.jpg"/>
           
                <CardBody>
                    <CardTitle>
                        <h1>Play</h1>
                    </CardTitle>
                    <CardText>
                   
                    I love to spend time in the outdoors. I hike and backpack with my dog Riva who is a Rhodesian Ridgeback. In 2022, I spent a month backpacking through Ireland. I also enjoy kayaking and paddleboarding both on flat water and white water. When I commit to something, I am all in and give 110%. 

                    <br></br>
                    I enjoy traveling and exploring as well as trying new things. A few fun facts about me are that I barrelman  rodeo clowned in the Rodeo Capital of the World. I unicycle and I went ice climbing for the first time in 2023. I also enjoy problem solving and have a fairly large board game collection.


                    </CardText>
                </CardBody>
            </Card>

            <Card className="Derby" style={{margin: '1rem', border: '3px solid rgb(221, 221, 221)', borderRadius: '10px', boxShadow: '0 0 2px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.3)'}}> 
            <img
            alt="Roller Derby Player SockHer Blue"
            src="/SockHer_Blue1.jpg"/>
           
                <CardBody>
                    <CardTitle>
                        <h1>Derby</h1>
                    </CardTitle>
                    <CardText>

                        Hey there! My name is SockHer Blue I have been actively playing WFTDA roller derby in Wyoming since 2016. I am a dedicated jammer and love to assist other teams and players when possible. I have a goal to bout in all 50 states. To date I have bouted in 18 states. I actively work on bettering myself as a derby player. In 2023, I attended rollercon for the first time, went to USARS Summer Nationals with the Colorado USARS Team, and I skated 64 miles on my quads from Athens to Atlanta in October where I received the skate or die award. In 2024, I attended Winter USARS Nationals with Team Bada**. I am always looking to bout in new places and at a high level. If you have an event you are interested in having me attend or just want to connect on facebook please reach out. 

                        {/* Hello, my name is SockHer Blue. I am an avid adventurer. I grew up roller blading and had played some pickup hockey in highschool. I began my skating journey in August of 2016 with Heart Mountain Wreck on Wheels in Cody, WY. In October of 2016 I broke my right ankle and am now posses a semi bionic ankle of 13 screws a 10 inch metal plate and a metal rope tying my ankle off.

                        <br></br>
                        In 2023 I skated 64 miles from Athens to Atlanta on my quads and recieved the Skate or Die Award. I have been actively pursuing roller derby since 2017. I have traveled to play in bouts and mixers since I began. I have a goal to bout in all 50 states. To date, I have have bouted in 18 states. I skated in my first USARS bout in 2023 and attended summer nationals in Lincoln, NE with the Colorado USARS Nationals Team. I also attended rollercon for the first time in 2023. In January of 2024, I skated with Team Bada** for USARS Winter Nationals. I am a passionate jammer but am willing to block and pivot. If you ever need an extra for a bout please let me know.  */}

                        {/* <br></br>
                        Teams I have rostered with and bouted with are: 
                        Heart Mountain Wreck on Wheels out of Cody, WY (2017-2019)
                        Black Hills Wild Fire out of Rapid City, SD (2017)
                        Magic City Rollers out of Billings, MT (2018)
                        Copper City Queens out of Butte, MT (2019)
                        Fremont County Cherry Bombs out of Riverton, WY (2019, 2021)
                        Bomber Mountain Derby Devils out of Buffalo, WY (2019)
                        Cheyenne Capidolls out of Cheyenne, WY  (2021-2024)
                        Portneuf Valley Bruisers out of Pocatello, ID (2021)
                        Las Alamos Derby Dames out of Las Alomos, NM (2022) 
                        WYDAHO out of Wyoming and Idaho (2022-2024)
                        Oklahoma A Team out of Tulsa, OK (2023)
                        Flatrock Roller Derby out of North Platte, NE (2023)
                        Bittersweet Bombshells out of Rock Springs, WY (2023)
                        Salina Sirens Roller Derby out of Salina, KS (2023)
                        Colorado USARS Nationals Team out of CO (2023-2024)
                        Sioux Falls Roller Dollz out of Sioux Falls, SD (2023)
                        Team Bada** satelite skaters. (2024)
                        Arizona Skate Club out of AZ (2024) */}

                        <br></br>
                        
                        <div style={{marginTop: '40px'}}>
                            <a href="https://www.facebook.com/sophia.macik">
                                <img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white"></img>
                            </a>
                        </div>
                    </CardText>
                </CardBody>
            </Card>

            {/* <div ref={bottomDiv}></div> */}
        </CardGroup>
        {/* <RemoveScroll>
            <div></div>
        </RemoveScroll> */}
        </div>
       
    
    )
}

export default About;