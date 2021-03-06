﻿"use strict";

var canvas;
var ctx;
var canvas_width;
var canvas_height;
var grid_height;
var cell_width;
var snake_array;
var snake_direction;
var game_loop;
var food;
var pause;
var levels;
var refreshrate;
var widths;
var level;

var level2score = 300;

var level3score = 600;


var score;

//Key Value , Score:Refreshrate
levels = {
    [0]: 240,
    [level2score]: 120,
    [level3score]: 60
};

widths = {
    [0]: 30,
    [level2score]: 15,
    [level3score]: 10
}


//puts snake in the beginning position
function jsinit() {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


    canvas_width = canvas.width;
   
    canvas_height = canvas.height;

    //canvas height is made bit large to accomodate extra space to display Score
    grid_height = canvas_height-30

    pause = false;
    snake_direction = "right";
  

    create_snake();

    score = 0;

    level = 0;

    cell_width = widths[score];

    //creates first food. food depends on score and cell width
    create_food();

 

    
   
}

//done only once, not called in refresh
//first array element is 4,0  which is the last cell(head) of snake. snake is painted from head to back
function create_snake() {
    //length of the snake
    //check with a greater number like 25 for collison to itself test
    var length = 5;

    //Empty array to start with
    snake_array = [];

    for (var i = length - 1; i >= 0; i--) {
        //horizontal snake starting from top left. head is first cell. tail is last
        snake_array.push({ x: i, y: 0 });
    }

}

//random coordinates for food. does not paint them
function create_food() {
    //object literal notation for an object with x and y
    // (450-10)/10  = 440/10 = 44
    //random member between 0-44 for x and y co-ordinates to place food
    food = {
        x: Math.round(Math.random() * ((canvas_width - cell_width) / cell_width)),
        y: Math.round(Math.random() * ((grid_height - cell_width) / cell_width)),
    };

 
    
}



//x and y 0-44
function paint_cell(x,y,color)
{
    ctx.fillStyle = color;

    //cell_width set at 10
    ctx.fillRect(x * cell_width, y * cell_width, cell_width, cell_width);
}

function check_collision(x,y, array)
{
    //Check if x or y exists in array
    //Or if the nextx abd nexty is in sname array. ie if the sname if moving to itself
    //return true if collision

    //starts from 1. 0 index contains next move co-ordinates which  when checked causes collison
    for(var i = 1; i < array.length; i++)
    {
        if (array[i].x == x && array[i].y == y) return true;
    }

    return false
}

function pauseGame() {

    //terniatry operator for pausing, resuming
    pause == true ? pause = false : pause = true;
}

//sleeos for ms seconds.
function sleep(ms) {

    //alert("Inside Sleep");
    var dt = new Date();
    while (Date.now() - dt.getTime() <= ms) { }
    return true;
}


//default parameters in ES2015
function drawsnake(color='blue') {

    //paint snake. head is drawn first. tail is last
    for (var i = 0; i < snake_array.length; i++) {
        var c = snake_array[i];

        paint_cell(c.x, c.y,color);
    }
}

//https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_lineto
var drawAGridLine = function(startx,starty,endx,endy)  {
    ctx.beginPath();
    ctx.moveTo(startx, starty);
    ctx.lineTo(endx, endy);
    ctx.stroke();
}