window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault()
    };
}, false);

var canvasElement = document.getElementById('soccer');
var game = canvasElement.getContext('2d');
var grass = document.getElementById("grass");
var background = game.createPattern(grass, "repeat");

let setAttr = canvasElement.setAttribute.bind(canvasElement);
  setAttr('width', 800);
  setAttr('height', 600);

var touch_variables = {};

class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = 1;

        this.changeAngle(0);
        this.movement = 0;
    }

    changeAngle(angle) {
        if(angle == 0) {
            angle = 1
        };
        this.angle = angle;
        this.radians = this.angle / (180 * Math.PI) * 10;
        this.xunits = Math.cos(this.radians) * this.speed;
        this.yunits = Math.sin(this.radians) * this.speed;
    }

    angleTo(x, y) {
        this.changeAngle(Math.atan2(y - this.y, x - this.x));
    }

    render() {
        this.x += this.xunits;
        this.y += this.yunits;
        game.save();
        game.beginPath();
        game.fillStyle = "white";
        this.movement += this.speed;
        game.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        game.save();
        game.strokeStyle = "black";
        game.fill();
        game.stroke();
        game.restore();
    }
}

class Player {
    constructor(x, y, width, height, game, color) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.game = game;
        this.innerColor = color;
        this.outerColor = "black";
    }

    changeCoords(x, y) {
        this.x = x;
        this.y = y;
    }

    render() {
        let game = this.game;
        game.beginPath();
        game.fillStyle = this.innerColor;
        game.strokeStyle = this.outerColor;
        game.rect(this.x, this.y, this.width, this.height);
        game.stroke();
        game.fill();
    }
}

function drawField(game) {
    this.game.fillStyle = background;
    this.game.fillRect(0, 0, canvasElement.width, canvasElement.height);
    
    this.game.fillStyle = "rgb(200, 200, 200, 1)"
    this.game.fillRect(0, (canvasElement.height / 2) - 100, 20, 200)
    this.game.fillRect(canvasElement.width - 20, (canvasElement.height / 2) - 100, 20, 200)

    let currentX = canvasElement.width / 2,
        currentY = 0;
    game.beginPath();
    game.moveTo(currentX, currentY);
    game.lineTo(currentX, canvasElement.height);
    game.strokeStyle = "white";
    game.stroke();

    
    game.lineTo(0, canvasElement.height / 2);
    

}

function initBall(game) {
    game.beginPath();
    let ball_x = canvasElement.width / 2;
    let ball_y = canvasElement.height / 2;
    let ball_radius = 8;
    game.arc(ball_x, ball_y, ball_radius, 0, 2 * Math.PI);
    ball = new Ball(ball_x, ball_y, ball_radius);
    game.fillStyle = "white";
    game.save();
    game.strokeStyle = "black";
    game.fill();
    game.stroke();
    game.restore();
}

function initPlayers(game) {

    function drawBlue() {
        game.beginPath();
        let paddle_x = 100;
        let paddle_y = canvasElement.height / 2 - 30;
        blue = new Player(paddle_x, paddle_y, 30, 30, game, "blue");
    }
    
    function drawRed() {
        game.beginPath();
        let paddle_x = canvasElement.width - 130;
        let paddle_y = canvasElement.height / 2 - 30;
        red = new Player(paddle_x, paddle_y, 30, 30, game, "red");
    }
    
    drawBlue();
    drawRed();
}

function addKeys(blue, red, speed) {
    document.onkeydown = function(buttonPressed) {
        switch (buttonPressed.key) {
            case "ArrowLeft":
                red.x = red.x - speed;
                break;
            case "ArrowRight":
                red.x = red.x + speed;
                break;
            case "ArrowUp":
                red.y = red.y - speed;
                break;
            case "ArrowDown":
                red.y = red.y + speed;
                break;
            case "a":
                blue.x = blue.x - speed;
                break;
            case "d":
                blue.x = blue.x + speed;
                break;
            case "w":
                blue.y = blue.y - speed;
                break;
            case "s":
                blue.y = blue.y + speed;
                break;
        }
    }
    window.focus();
}

function renderScores(game) {
    game.font = "30px Georgia";
    game.fillStyle = "white";
    game.fillText("Blue: " + blue_points, 10, 30);
    game.fillText("Red: " + red_points, canvasElement.width - 110, 30);
}

function resetPlayers(blue, red) {
    blue.x = 100;
    blue.y = canvasElement.height / 2 - 30;
    red.x = canvasElement.width - 130;
    red.y = canvasElement.height / 2 - 30;
}

function addPoint(playerColor) {
    switch(playerColor) {
        case "blue": 
            blue_points += 1;
        break;
        case "red":
            red_points += 1;
        break;
    }
    ball.changeAngle(180 - ball.angle);
    ball.x = canvasElement.width / 2;
    ball.y = canvasElement.height / 2;   
}

function collisionCheck() {
    // Bounds and Scoring

    if (
        0 < ball.x + ball.radius &&
        0 + 20 > ball.x &&
        200 < ball.y + ball.radius &&
        200 + 200 > ball.y
        ) {
            addPoint("red")
            resetPlayers(blue, red)
    } else if (
        780 < ball.x + ball.radius &&
        780 + 20 > ball.x &&
        200 < ball.y + ball.radius &&
        200 + 200 > ball.y
        ) {
            addPoint("blue")
            resetPlayers(blue, red)
    } else if (ball.y >= canvasElement.height - ball.radius || 
        ball.y <= 0 + ball.radius) {
            ball.changeAngle(360 - ball.angle)
    } else if (ball.x >= canvasElement.width - ball.radius ||
        ball.x <= 0 + ball.radius) {
            ball.changeAngle(180 - ball.angle)
    };

    // Blue Collision
    if (
        blue.x < ball.x + ball.radius &&
        blue.x + blue.width > ball.x &&
        blue.y < ball.y + ball.radius &&
        blue.height + blue.y > ball.y
        ) {
            ball.changeAngle( Math.floor(Math.random() * (175 - 180) + 175) - ball.angle)
    };

    // Red Collision
    if (
        red.x < ball.x + ball.radius &&
        red.x + red.width > ball.x &&
        red.y < ball.y + ball.radius &&
        red.height + red.y > ball.y
        ) {
            ball.changeAngle( Math.floor(Math.random() * (175 - 180) + 175) - ball.angle)
    };
    
}

setInterval(collisionCheck, 1);

let blue, red, ball;
let blue_points = 0;
let red_points = 0;

initPlayers(game);
initBall(game);
addKeys(blue, red, 20, canvasElement);

function draw() {
    drawField(game);

    blue.render();
    red.render();
    ball.render();

    renderScores(game);

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);