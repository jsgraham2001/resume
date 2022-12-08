// Javascript for Final Project

function genBoard() {
    console.log("Generating board...");
    
    var game = document.getElementById("game");
    var instructions = document.getElementById("instructions");
    var board = document.getElementById("board");
    board.style.display = 'flex';
    var feedback = document.getElementById("feedback");
    feedback.style.display = 'flex';

    var h;
    var w;

    //H/W
    h = parseInt(document.getElementById("height-num").value);
    w = parseInt(document.getElementById("width-num").value);
    console.log("Height and width selected: " + h, w);
    game.style.height = h + "px";
    game.style.width = w + "px";
    instructions.style.height = h + "px";

    //Radios
    var radios = document.getElementsByName("difficulty");
    var chosenRadio = ""
    for (var i = 0; i < radios.length; i++) {
        if(radios[i].checked == true) {
            console.log("Option from radios selected: " + radios[i].value)
            chosenRadio = radios[i].value
        }
    }
    if (chosenRadio === "beg") {
        game.style.height = "400px";
        h = 400;
        game.style.width = "600px";
        w = 600;
        instructions.style.height = "400px";
    } else if (chosenRadio === "adv") {
        game.style.height = "600px";
        h = 600;
        game.style.width = "800px";
        w = 800;
        instructions.style.height = "600px";
    } else if (chosenRadio === "pro") {
        game.style.height = "600px";
        h = 600;
        game.style.width = "200px";
        w = 200;
        instructions.style.height = "600px";
    }

    //Menu Box
    var diffMenuSelected = document.getElementById("diff-menu").value;
    console.log("Option from menu selected: " + diffMenuSelected)
    if (diffMenuSelected === "beg") {
        game.style.height = "400px";
        h = 400;
        game.style.width = "600px";
        w = 600;
        instructions.style.height = "400px";
    } else if (diffMenuSelected === "adv") {
        game.style.height = "600px";
        h = 600;
        game.style.width = "800px";
        w = 800;
        instructions.style.height = "600px";
    } else if (diffMenuSelected === "pro") {
        game.style.height = "600px";
        h = 600;
        game.style.width = "200px";
        w = 200;
        instructions.style.height = "600px";
    }


    //For ball, global variables could be used elswhere.
    console.log("Final Height: " + h + " Final Widith: " + w)
    document.documentElement.style.setProperty('--height', h + "px");
    document.documentElement.style.setProperty('--width', w + "px");


    //Character
    var character = document.getElementById("character");
    var playerCheck = document.getElementById("player-chk").checked;
    console.log("Player checked: " + playerCheck)
    if (playerCheck) {
        character.style.display = 'block'
    } else {
        character.style.display = 'none'
    }

}


setInterval(test, 1000);

function test() {
    
}


document.addEventListener('keydown', function(buttonPressed) {
    
    var c = document.getElementById('character');
    var cLeft = parseInt(window.getComputedStyle(c).getPropertyValue("left"));
    var cTop = parseInt(window.getComputedStyle(c).getPropertyValue("top"));

    const key = buttonPressed.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

    console.log("Character " + key)
    console.log("Left position: " + cLeft + 
                "\nTop position: " + cTop);
    
    switch (key) {
        
        case "ArrowLeft":
            c.style.left = (cLeft - 5) + "px"
            break;
        case "ArrowRight":
            c.style.left = (cLeft + 5) + "px"
            break;
        case "ArrowUp":
            c.style.top = (cTop - 5) + "px"
            break;
        case "ArrowDown":
            c.style.top = (cTop + 5) + "px";
            break;
    }


});







// Old Stuff

function notUsed() {
    var gameRect
    var gameLeft
    var gameTop
    var leftChange
    var topChange

    gameRect = document.getElementById('game').getBoundingClientRect();  
    gameLeft = parseInt(gameRect.left);
    gameTop = parseInt(gameRect.top);

    //console.log("Game")
    //console.log("Left position: " + gameLeft + 
    //            "\nTop position: " + gameTop);     

    
    var currentLeft = gameLeft

    leftChange = cLeft + (cLeft - gameLeft);
    topChange = cTop - gameTop;
    console.log(leftChange)
}



function jump() {
    if(character.classList == "animate"){
        return;
    }
    character.classList.add("animate");
    setTimeout(removeJump,300); //300ms = length of animation
};

function removeJump() {
    character.classList.remove("animate");
}


var block = document.getElementById("block");
function checkDead(){
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<20 && blockLeft>-20 && characterTop>=130){
        alert("Game over");
    }
}

//setInterval(checkDead, 10);