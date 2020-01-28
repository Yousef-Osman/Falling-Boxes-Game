var main = document.getElementById("main");
var start = document.getElementById("start-btn");
var stop = document.getElementById("stop-btn");
var winner = document.querySelector(".pop-up1");
var loser = document.querySelector(".pop-up2");
var score = document.querySelector(".score");
var gameOver = document.querySelector(".game-over");
var cdTimer = document.querySelector(".timer2");
var points = 0;
var colLength = 600;
var newItem;
var square;
var sqrLeft;
var sqrTop;
var colorArray;
var creating;
var moveDown;
var moving;

//Function to create a random color
function randomColor(){
    this.colorArray = ["#CC0000", "#FF8800", "#007E33", "#00695c", "#0d47a1", "#9933CC"];
    var ranColor = Math.floor(Math.random()*6);
    var color = colorArray[ranColor];
    return color;
}

var squareT;
var squareL;
var ocupied;

//Function to create objects to match the boxes on the screen, it contains the top and left parameters for each element and a number that present the color of th box
function checkObj(tp, lf){
    this.squareT = tp * 50;
    this.squareL = lf * 50;
    this.ocupied = 0;
}

//Create 2d array (13 * 10) and set the values of the last row  = 7 to stop boxes from moving down
var objArray = [13]
for (var row = 0; row < 13; row++) {
    objArray[row] = [10];
    for (var col = 0; col < 10; col++) {
        objArray[row][col] = new checkObj(row, col);
        if(row == 12){
            objArray[row][col].ocupied = 7;
        }
    } 
}

//Function to check adjacent elements in the matrix
function checkArray(r,c){
    this.i = r;
    this.j = c;
    for(i = 0; i<12-3; i++){
        for(j = 0; j<10; j++){  //If five elements in the colum have the same color, the game ends and the player wins
            if(i<12-4 && objArray[i][j].ocupied == objArray[i+1][j].ocupied && objArray[i][j].ocupied == objArray[i+2][j].ocupied && objArray[i][j].ocupied == objArray[i+3][j].ocupied && objArray[i][j].ocupied == objArray[i+4][j].ocupied && objArray[i][j].ocupied != 0){
                winner.style.visibility = "visible";
                clearInterval(creating);
            }
            if(objArray[i][j].ocupied == objArray[i+1][j].ocupied && objArray[i][j].ocupied == objArray[i+2][j].ocupied && objArray[i][j].ocupied == objArray[i+3][j].ocupied && objArray[i][j].ocupied != 0){  //If four elements in the colum have the same color, the player gets 10 points
                points += 10;
                score.textContent = points;
                if(points == 30){
                    clearInterval(creating);
                    clearInterval(moving);
                    clearInterval(timercount);
                    winner.style.visibility = "visible";
                }
                objArray[i][j].ocupied = -1;
                objArray[i+1][j].ocupied = -2;
                objArray[i+2][j].ocupied = -3;
                objArray[i+3][j].ocupied = -4;
            }
        }
    }
    for(i = 0; i<12; i++){
        for(j = 0; j<10-3; j++){    //If five elements in the row have the same color, the game ends and the player wins
            if(j<10-3 && objArray[i][j].ocupied == objArray[i][j+1].ocupied && objArray[i][j].ocupied == objArray[i][j+2].ocupied && objArray[i][j].ocupied == objArray[i][j+3].ocupied && objArray[i][j].ocupied && objArray[i][j].ocupied == objArray[i][j+4].ocupied != 0){
                winner.style.visibility = "visible";
                clearInterval(creating);
            }
            if(objArray[i][j].ocupied == objArray[i][j+1].ocupied && objArray[i][j].ocupied == objArray[i][j+2].ocupied && objArray[i][j].ocupied == objArray[i][j+3].ocupied && objArray[i][j].ocupied != 0){  //If four elements in the row have the same color, the player gets 10 points
                points += 10;
                if(points == 30){
                    clearInterval(creating);
                    clearInterval(moving);
                    clearInterval(timercount);
                    winner.style.visibility = "visible";
                }
                score.textContent = points;
                objArray[i][j].ocupied = -1;
                objArray[i][j+1].ocupied = -2;
                objArray[i][j+2].ocupied = -3;
                objArray[i][j+2].ocupied = -4;
            }
        }
    }
}

//Function for the event Listner to move Square Left and Right
function moveSquare(e){
    square = document.querySelector(".square:last-child");
    switch(e.key){
        case "ArrowRight":
            if(sqrLeft < 450 && objArray[(moveDown/50)][(sqrLeft/50+1)].ocupied == 0){
                square.style.left = parseInt(square.style.left) + 50 + "px";
                sqrLeft +=50;
            }
            break;
        case "ArrowLeft":
            if(sqrLeft > 0 && objArray[(moveDown/50)][(sqrLeft/50-1)].ocupied == 0){
                square.style.left = parseInt(square.style.left) - 50 + "px";
                sqrLeft -=50;
            }
            break;
    }        
}

//Function to set the object (ocupied) value to a number that matches it's color
function matchNumToColor(row,col){
    var colorArray2 = ["rgb(204, 0, 0)", "rgb(255, 136, 0)", "rgb(0, 126, 51)", "rgb(0, 105, 92)", "rgb(13, 71, 161)", "rgb(153, 51, 204)"];
    if(square.style.backgroundColor == colorArray2[0]){
        objArray[row][col].ocupied = 1;
    }else if(square.style.backgroundColor == colorArray2[1]){
        objArray[row][col].ocupied = 2;
    }else if(square.style.backgroundColor == colorArray2[2]){
        objArray[row][col].ocupied = 3;
    }else if(square.style.backgroundColor == colorArray2[3]){
        objArray[row][col].ocupied = 4;
    }else if(square.style.backgroundColor == colorArray2[4]){
        objArray[row][col].ocupied = 5;
    }else if(square.style.backgroundColor == colorArray2[5]){
        objArray[row][col].ocupied = 6;
    }
}

//Event listner to stop the game whenever stop bottom is pressed
stop.addEventListener("click", stopGame);
function stopGame(){
    clearInterval(creating);
    clearInterval(moving);
    clearInterval(timercount);
    gameOver.style.visibility = "visible";
}

//Function to start count down
var timercount
function countDown(){
    var counter = 0;
    var seconds;
    timercount = setInterval(function(){
        counter ++;
        seconds = 120 - counter;
        var min = Math.floor(seconds/60);
        var sec = seconds % 60;
        cdTimer.textContent = min + ":" + sec;
        if(seconds == 0){
            stopGame();
        }
    },1000);
}

//Event Listner to start the game
start.addEventListener("click", startMotion);
function startMotion(){
    countDown();
    creating = setInterval(function(){      //Function to create and move it down
        if(colLength > 0){
            newItem = document.createElement("div");
            newItem.classList.add("square");
            main.appendChild(newItem);    
            square = document.querySelector(".square:last-child");
            square.style.backgroundColor = randomColor();
            sqrLeft = square.style.left = 0;
            sqrTop = square.style.top = 0;
            window.addEventListener("keydown", moveSquare);  
            moveDown = 0;
            var flag = 0;

            moving = setInterval(function(){
                if(flag == 0){
                    if(objArray[(moveDown/50+1)][(sqrLeft/50)].ocupied == 0){
                        moveDown +=50;
                        square.style.top = moveDown+"px";                   
                    }else{
                        matchNumToColor((moveDown/50),(sqrLeft/50));
                        clearInterval(moving);
                        window.removeEventListener("keydown", moveSquare);
                        checkArray((moveDown/50),(sqrLeft/50));
                        if(moveDown <= 0)
                        {
                            clearInterval(creating);
                            console.log("You Lost");
                            loser.style.visibility = "visible";
                        }
                    }
                }
            },200);  
        }else{
            clearInterval(creating);
            console.log("stopped");
        }
    },2500);
}

//Event listners to return the game to the first page
var firstPage1 = document.querySelector(".first-page1");
firstPage1.addEventListener("click", goToFirstPage);

var firstPage2 = document.querySelector(".first-page2");
firstPage2.addEventListener("click", goToFirstPage);

var firstPage3 = document.querySelector(".first-page3");
firstPage3.addEventListener("click", goToFirstPage);    

//function to return the game to the first page
function goToFirstPage(){
    console.log("working");
    location.replace("../html/StartHere.html");
}