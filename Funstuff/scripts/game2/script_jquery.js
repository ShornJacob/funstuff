﻿$(document).ready(function () {

    //seems angular controller executes before jquery ready

  
   

  

    $(document).keydown(function (e) {
        var key = e.which;

        //this flicks pause status
        if (key == "32") pauseGame();

        //direction keys are  valid when game is not paused
        if (pause == false) {
            if (key == "37" && snake_direction != "right") snake_direction = "left";
            else if (key == "38" && snake_direction != "down") snake_direction = "up";
            else if (key == "39" && snake_direction != "left") snake_direction = "right";
            else if (key == "40" && snake_direction != "up") snake_direction = "down";
        }
       
    })


    //touchSwipe - enable swipe 

    $("#container").swipe({

        swipe: function (event, direction, distance, duration, fingerCount) {
            switch (direction) {

                //distance paramteter moves the plane far too much. some othe unit suspected. divide by 10 

                case 'left': //left
                    if (snake_direction != "right") snake_direction = "left";
                    break;


                case 'right': //right
                    if (snake_direction != "left") snake_direction = "right";
                    break;


                    //reset to straight picture using clearMove
                case 'up': //up
                    if (snake_direction != "down") snake_direction = "up";
                    break;

     
                case 'down': //up
                    if (snake_direction != "up") snake_direction = "down";
                    break;
                  

                default: return; //exit this handler for other keys
            }
        },

        //default is 75.
        //The number of pixels that the user must move their finger by before it is considered a swipe.
        threshold:10

    })


})



