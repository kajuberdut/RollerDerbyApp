
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
  <a href="https://github.com/kicamSM/Capstone2">
    <img src="https://raw.githubusercontent.com/kicamSM/Board_Game_Mania/master/frontend/public/star.png" alt="star icon" width="160" height="160">
  </a>

  <h2 align="center" style="text-decoration: underline;">Board Game Mania</h2>

  <p align="center">
    A roller derby communication application. Create an account and join The Block Party. Update your profile. Join a team or create your own. Message another user or join a group chat. Find bouts and mixers or create your own. Welcome to Block Party.
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

"Block Party" is a roller derby communication application. This application allows users to add their own board games to "My Board  Games list" after an account is created. This application can then be used to log plays of any board games in "My Board Games List". When logging a play, this application will automatically generate a score board based on the number of players the user selects. You can then track the scores of all players and save the match. 

After saving the match, the user can view all his board games based on total wins, losses, and games played. He can then click on a specific game to view the match details which include  scores for each player, win for each player, date played and emails of players.

This web application is built with Python and Flask. It uses a free third party API (https://www.boardgameatlas.com/api/docs) that allows any user to search for board games. Board Game Mania uses the PostgreSQL database to store and save information.

This application is functional and ready to use. However, there are more features that I would like to continue integrating. One of these features is I would like a user to be able to access the total wins and losses of every player in any match they have competed in. I would also like a player to be able to sign up for the application with the email he has used to play. This would then automatically preload any games that he has played into his "games list" as well as all of the match details from his previous played games.


## Features 
* Intuitive
* Easy to use
* Create an account
* Update profile
* Create Mixers and Bouts
* Create or join a team
* Message other users 
* Join a mixer or bout chat  


<!-- GETTING STARTED -->
## Getting Started


To get a local copy up and running follow these simple steps.

### Installing with pip
***

  ```sh
  pip install https://github.com/kicamSM/Capstone2
  ```

For information about cloning and dev setup see: [Contributing](#Contributing)

<!-- CONTRIBUTING -->
## Contributing


Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Add tests, we aim for 100% test coverage [Using Coverage](https://coverage.readthedocs.io/en/coverage-5.3.1/#using-coverage-py)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Cloning / Development setup
***
1. Clone the repo and install
    ```sh
    git clone https://github.com/kicamSM/Capstone2
    cd Block Party
    pip install -r requirements.txt
    ```
2. Run tests
    ```sh
    python -m coverage run -m unittest discover -s tests
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