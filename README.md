
<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <div style="display: flex; justify-content: center;"> 
    <a href="https://github.com/kicamSM/Capstone2">
        <img src="https://raw.githubusercontent.com/kicamSM/Capstone2/master/frontend/public/star.png" alt="star icon" width="160" height="160">
    </a>
  </div>

  <h2 align="center" style="text-decoration: underline;">Block Party Roller Derby</h2>

  <h3 align="center" style="text-decoration: underline;">The Block Party starts when the star arrives.</h3>

  <p align="center">
    A roller derby communication application. Create an account and join the Block Party. Update your profile. Join a team or create your own. Message another user or join a group chat. Find bouts and mixers or create your own. Welcome to Block Party! 
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#project-in-action">Project In Action</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

"Block Party" is a roller derby communication application. This application allows users to create a profile and update profile information with relevant roller derby information. 

After an account is created, a user is able to access all mixers and bouts by date or location. They are also able to create mixers and bouts and join the associated chats for those games.

The user is also able to create a team which automatically creates a chat. If the user creates a team the user becomes the administrator for that team. If the user creates a team, the user can then invite other players to the team. After players accepts invites, the user can create a download an excel document with the team information. This will streamline information for events or tournaments. Users also can chat with other users. 

This web application is built with Python, Flask, and FastApi. 

This application is functional and ready to use. However, there are more features that I would like to continue integrating and this is my first step. I hope to make this the main platform for collaboration for roller derby players. 

My mission is to assist people coming together and playing one of the greatest sports on earth.

## Features 
* Intuitive
* Easy to use
* Create an account
* Update profile
* Create Mixers and Bouts
* Create or join a team
* Download an excel document with team participant information
* Message other users 
* Join a mixer or bout chat  


<!-- GETTING STARTED -->
## Getting Started


To get a local copy up and running follow these simple steps.

### Prerequisities


In order to run this container you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)


#### Environment Variables

Set your environment variables. 

* `DB_URL` - Postgres database url
* `SECRET_KEY` - Token secret key  
* `EXPIRE_MINS` - Token expiring minutes
* `FILE_STORAGE_PATH` - Absolute path to storage directory

#### Compose Up


  ```sh
  docker compose -f "docker-compose.yml" up -d --build 
  ```

### Installing with pip
***

  ```sh
  pip install https://github.com/kicamSM/Capstone2
  ```

For information about cloning and dev setup see: [Contributing](#Contributing)

<!-- CONTRIBUTING -->
## Contributing


Contributions are what make the open source community such an amazing place to be learn, inspire, and create. If you are interested in collaborating on this project please contact me.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Cloning / Development setup
***
1. Clone the repo and install
    ```sh
    git clone https://github.com/kicamSM/Capstone2
    cd Block Party
    pip install -r requirements.txt
    ```
2. Run tests frontend (must be in frontend directory)
    ```sh
    npm test 
    ```
3. Run tests api (must be in main directory)
    ```sh
    pytest api/src/tests/test_routers/name_of_file -vv -s
    ```


## Project In Action 

<!-- [https://board-game-mania.onrender.com](https://board-game-mania.onrender.com) -->

<!-- CONTACT -->
## Contact


Sophia Macik - kicamSMM@gmail.com

Project Link: [https://github.com/kicamSM/Capstone2](https://github.com/kicamSM/Capstone2)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/kicamSM/Capstone2?style=for-the-badge
[contributors-url]: https://github.com/kicamSM/Capstone2/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kicamSM/Capstone2?style=for-the-badge
[forks-url]: https://github.com/kicamSM/Capstone2/forks
[issues-shield]: https://img.shields.io/github/issues/kicamSM/Capstone2?style=for-the-badge
[issues-url]: https://github.com/kicamSM/Capstone2/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/sophiamacik/