# project_one
This is our code for Project 1 for CSE 437 Software Engineering Workshop

Documentation:

This project works through a very simple HTML and CSS page, with most of the heavy lifting done in JavaScript. An init() method is called once the HTML page loads, which creates a new instance of the User and Rectangle objects. The User object asks the user for a name to create a save file. The user can either cancel, sacrificing the ability to save their game, or enter a name which their high score will be saved under. If the name is already in the database, the app will contact Firebase and load their high score into the page. The Rectangle class draws a rectangle on the canvas, with a random X and Y coordinate. When the user clicks on the canvas, the event listener connected to the Canvas, the x and y-coordinates of their click are checked against the current Rectangle's coordinates. If the user has clicked on the rectangle, the hit counter is incremented. If they missed, their highscore will be saved in Firebase if it is higher than the previous highscore, and the hit counter is set back to 0 while an alert tells the user their final score.


Group members' contributions:
-some work was done in-class with all group members working together
-rest was by me, the singluar person who didn't drop the class.
