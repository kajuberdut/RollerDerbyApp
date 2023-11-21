# Capstone Two: Project Proposal Sophia Macik

## Roller Derby Networking:

This would be focused on mixers (open bouts where you can sign up). I think I could create my own api for this. (Would have to do some more research into this.) Teams could upload mixers as needed and maybe have an option to upload bouts if teams are looking for players to sub. 
Other things that I will include are:  
Player profiles: Create an account for yourself. This would include skill level. Type of roller derby that that the individual plays. There are multiple rulesets. Level of derby that individual is at. Teams that they roster with and insurance that they have. Contact information and location. 
Team profile: Would have to have a way to validate this? Not sure how I would implement but this would allow teams to upload an event and ideally be able to identify as a team? 
Uploading Bouts/ Mixers: Information: location, time, date theme, colors, bout or mixer, opposing team (if bout), needs additional players, sign up link, ruleset. Other information: 
Add this messaging feature: 
Messaging/ applications: Have the ability for teams and players to message each other regarding events. Ideally this  would be a realtime messaging application. 

### Other possible features could include:
Search by location:  Have a player be able to search by location or miles? 

## Additional Information and Features:
1.	What tech stack will you use for your final project? 
    1.	React and Node for the front end. 
    2. React and Node for backend. 
    2. I would like to build my api using fastApi and Python. 
2.	Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application?
    1.	I think this would be an evenly focused application. 
3.	Will this be a website? A mobile app? Something else?
    1.	Website 
4.	. What goal will your project be designed to achieve?
    1.	The problem of not having centralized information in roller derby. Hopefully this would be a way to solve that problem. I also am interested in creating a website later on that would handle all of this and more! 
5.	What kind of users will visit your app? In other words, what is the demographic of your users?
    1.  Demographics is going to be any adult who is involved in roller derby or is part of an adult team. Generally ages 18 - 65. 
6.	What data do you plan on using?
    1.  The data is going to be entered by the users. I think I will need to create an API for this. 
7.	In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information:
	1. What does your database schema look like?
        1. For now it will have users
        2.	It will also have bouts/ mixers  (I have not decided if I need to break those up or not. I will need to be able to distinguish between those two.)
        3.	Applications 
            1.	Hopefully would like to be able to allow users to apply for bouts (not mixers).
        4.	Messages 
            1.	Ability for users to message teams etc. Ideally this would be in real time. This is going to be a central focus of my application. This is also going to be what makes it more than a CRUD application. 
        5. What kinds of issues might you run into with your API? 
            1.	Creating an Api for one. Also building a messaging application. We shall see how it goes 
        6.	Is there any sensitive information you need to secure?
            1.	Passwords, insurance # and maybe contact details if I use those? Yet to be determined. 
        7.	What functionality will your app include? Messaging, putting in an application for a skater, hopefully a location finder for bouts and mixers. At the very least displaying mixers and bouts
        8.	What will the user flow look like?
            1. Login/Signup 
                1. Would like to verify email with real email (will have to look into this and this could be an added stretch goal). 
            2. Will have navbar with links to Mixers, Bouts, search bar by location, and users.
            3. May have this be an automatic upload based on a setting that a user could click. So x mile radius. When a user logs in those items automatically populate. 
            4. Mixers - will be able  to click on the mixer and see information for that mixer. Most mixers already have a signup so I will probably just have a place to post that link for that team. 
            5. Bouts - click  on it and if more players are needed be able to fill out a form to play for that team. This ideally is going to show up in the teams application inbox.
            6. A user will be able to search for another user or team and from there they should be able to message that user. 
        9.	What features make your site more than a CRUD app? What are your stretch goals?
            1.	Messaging will make it more than CRUD, also putting in an application. 
            2. Stretch goals would be to add a location feature. This would be especially interesting if I could figure out how to scrape information from websites for this portion.  



### Notes for me: 
Internal API  user flow…. Functions would I need to go gather. Dictate database and what api would like. Data structure
Latest version. React documentation. 

### Names: 
Data Cacher, Data Brutilizeher (a Roller Derby Application), Conteact-Roller-Derby 
React-Roller 

## Database Schema: 
-	Users (account):
    -	Username 
    -	Password: password
    -	Roller derby name: text
    -	Facebook name: text
    -	Email: email
    -	Image: image
    -	about:
    -	location:
    -	level: 
    -   submitted applications? 

-	Teams (account):
    -	Username 
    -	Password: password
    -	Team name: text
    -	Email: email
    -	Image: image
    -	about:
    -	location:
    -	level: 
    -   received applications? 

-Bout/Mixer 

-	Bouts/Mixers: 
    -	Address:
    -	Time:
    -	Date:
    -	Theme: 
    -	JerseyColors: 
    -	Opposing team if Bout
    -	NeedsPlayers: true/false
    -	Ruleset: required drop down?? WFTDA, USARS, BANKED TRACK, SHORT TRACK
    -	signUp link: not required
    -	co-ed: true/false


- 	Application
    -	Derby Name 
    -	Derby Number 
    -	Insurance Number and what type: WFTDA/USARS/N/A
    -	Level of Skater 

-	Messages: 
    -	id
    -	Recipient Username 
    -	Sender username 
    -	Content
    -	Timestamp
    -	Is_read?? 

Messaging Web Sockets 

### Routes for Api: 

-  Users: 
    -  get all users 
    -  get a user by id 
    -  get user by location 
    -  get user by level
    -  get user by facebook_name 
    -  post new user 

-  Events 
    -  get all events
    -  get an event by id 
    -  get event by date
    -  get event by theme 
    -  get event by level
    -  get event by ruleset 
    -  get event by co_ed
    -  post new bout
    -  post new mixer 


