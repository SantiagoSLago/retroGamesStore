/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
///////////////////  Constants   ///////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////


//PLayer
class Player {
    constructor(username) {
        this.username = username,
            this.score = 0
    }
}
let player = JSON.parse(localStorage.getItem("user"));
let player2 = new Player("John Wick");
let player3 = new Player("Pope Francis");
let player4 = new Player("Jack Black");
let player5 = new Player("Sheldon Cooper");
let players = [player2, player3, player4, player5]


let playerName;
let playerScore;
let initText;
let tryAgainText;



const DIRECTIONS = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
}
let snake = [];

let newDirection = DIRECTIONS.RIGHT;
let actualDirection = DIRECTIONS.RIGHT;


let screen = document.getElementById("game");
let CTX = screen.getContext("2d");
let scoreboard = document.querySelector(".score-title-container");
let cicle;
let FPS = 1000 / 12;
let food;



/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
///////////////////  Drawing    /////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////




//Funcion de dibujo de la cuadricula
// function drawGrid(context) {
//     for (let x = 20; x < 600; x += 20) {
//         context.beginPath()
//         context.fillStyle = "black";
//         context.moveTo(x, 0);
//         context.lineTo(x, 600);
//         context.stroke()
//     }
//     for (let y = 20; y < 600; y += 20) {
//         context.beginPath()
//         context.fillStyle = "black";
//         context.moveTo(0, y);
//         context.lineTo(600, y);
//         context.stroke()
//     }
// }

//Funcion de rellenado de un cuadrado
function drawSquare(context, posX, posY) {
    context.beginPath();
    context.fillStyle = "red";
    context.fillRect(posX, posY, 20, 20);
    context.stroke();
}

//Funcion para la creacion de un cuadrado de la culebra
function drawSnake(context, snake) {
    for (let i = 0; i < snake.length; i++) {
        drawSquare(context, snake[i].posX, snake[i].posY)
    }
}

//Funcion de rellenado del cuadrado de comida
function drawFood(context, food) {
    drawSquare(context, food.posX, food.posY);
}

//Funcion de posicionamiento aleatorio de la comida y precaucion de que se posicione en el mismo lugar que la serpiente
function foodPositioning(snake) {
    while (true) {
        let posX = Math.floor(Math.random() * 29) * 20;
        let posY = Math.floor(Math.random() * 29) * 20;

        let colitionWithSnake = false;

        for (let i = 0; i < snake.length; i++) {
            if (snake[i].posX === posX && snake[i].posY === posY) {
                colitionWithSnake = true;
                break;
            }
        }

        if (colitionWithSnake) {
            continue;
        }

        return {
            posX: posX,
            posY: posY
        }
    }
}

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////   Snake Behaviour   ////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////


function moveSnake(direction, snake) {

    let snakeHeadX = snake[0].posX;
    let snakeHeadY = snake[0].posY;


    switch (direction) {
        case DIRECTIONS.UP:
            snakeHeadY -= 20;
            break;
        case DIRECTIONS.DOWN:
            snakeHeadY += 20
            break;
        case DIRECTIONS.LEFT:
            snakeHeadX -= 20;
            break;
        case DIRECTIONS.RIGHT:
            snakeHeadX += 20;
            break;

        default:
            break;
    }

    snake.unshift({ posX: snakeHeadX, posY: snakeHeadY })
    return snake.pop(); //Retorna la cola eliminada para agregarla en el caso de que coma comida

}

function snakeDirectioning(event) {
    if (event.code === "ArrowUp" && actualDirection !== DIRECTIONS.DOWN) {
        newDirection = DIRECTIONS.UP
    } else if (event.code === "ArrowDown" && actualDirection !== DIRECTIONS.UP) {
        newDirection = DIRECTIONS.DOWN
    } else if (event.code === "ArrowRight" && actualDirection !== DIRECTIONS.LEFT) {
        newDirection = DIRECTIONS.RIGHT
    } else if (event.code == "ArrowLeft" && actualDirection !== DIRECTIONS.RIGHT) {
        newDirection = DIRECTIONS.LEFT
    }
}

function snakeEatFood(snake, food) {
    if (snake[0].posX === food.posX && snake[0].posY === food.posY) {
        return true;
    } else {
        return false
    }
}

function snakeBorderColition(snake) {
    let snakeHeadX = snake[0].posX;
    let snakeHeadY = snake[0].posY;

    if ((snakeHeadX === -20) ||
        (snakeHeadY === -20) ||
        (snakeHeadX === 600) ||
        (snakeHeadY === 600)
    ) {
        return true;
    } else {
        return false
    }

}

function snakeSelfColition(snake) {
    let snakeHeadX = snake[0].posX;
    let snakeHeadY = snake[0].posY;
    for (let i = 1; i < snake.length; i++) {
        if ((snakeHeadX === snake[i].posX) && (snakeHeadY === snake[i].posY)) {
            return true;
        }
    }
}

document.addEventListener('keydown', (e) => {
    e.preventDefault() //Prevent default usado para evitar el desplazamiento vertical de la pantalla durante el juego
    snakeDirectioning(e)
})




/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
///////////////   Game Cicle & Config  /////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////


function gameCicle() {

    let erasedTail = moveSnake(newDirection, snake, food)
    actualDirection = newDirection;

    if (snakeEatFood(snake, food)) {
        //GrowSnake
        snake.push(erasedTail)
        //FoodRepositioning
        food = foodPositioning(snake)
        //SetPlayerScore
        pointsCounter(player, playerScore)
    }

    CTX.clearRect(0, 0, 600, 600);//Borra la cuadricula en cada movimiento para borrar la cola de la serpiente
    drawSnake(CTX, snake);
    drawFood(CTX, food)


    if (snakeBorderColition(snake)) {
        clearInterval(cicle);
        cicle = undefined
        initText.innerText = 'Game Over: Click to play again'
        initText.classList.toggle("hidden")
        setFinalScoreBoard(players, player)
        resetScoreBoard(players, player)

    }

    if (snakeSelfColition(snake)) {
        clearInterval(cicle);
        cicle = undefined
        initText.innerText = 'Game Over: Click to play again'
        initText.classList.toggle("hidden")
        setFinalScoreBoard(players, player)
        resetScoreBoard(players, player)


    }
}

function pointsCounter(player, htmlElement) {
    player.score += 10
    // htmlElement.innerText = `Score: ${player.score}`
    htmlElement.innerText = ` ${player.score}`
}

function beginGame() {

    playerName = document.getElementById("playerName");
    playerScore = document.getElementById("playerScore");
    initText = document.getElementById("initText");
    initText.classList.toggle("hidden")
    playerName.innerText = `${player.username}`
    playerScore.innerText = `${player.score}`

    snake = [
        { posX: 80, posY: 20 },
        { posX: 60, posY: 20 },
        { posX: 40, posY: 20 },
        { posX: 20, posY: 20 }
    ];

    newDirection = DIRECTIONS.RIGHT;
    actualDirection = DIRECTIONS.RIGHT;
    food = foodPositioning(snake);
}


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
///////////////////   ScoreBoard   //////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

function scoreAutomaticGenerator(players) {
    players.forEach(player => {
        player.score = Math.floor(Math.random() * 7 + 2) * 10;
    });
}

function setFinalScoreBoard(players, player) {
    players.forEach(element => {
        if (!players.includes(player)) {
            if (player.score >= element.score) {
                players.push(player)
            }
        }
    });
}

//Funcion de dibujo del tablero de posiciones
function drawScoreboard(players, player) {
    scoreAutomaticGenerator(players)
    players.sort((a, b) => b.score - a.score)
    const ol = document.createElement("ol");
    players.forEach(player => {
        const li = document.createElement("li")
        li.textContent = `${player.username} ${player.score}`
        ol.appendChild(li)
    })
    scoreboard.appendChild(ol)
}

function resetScoreBoard(players) {
    console.log("Jugadores")
    console.log(players)
    players.sort((a, b) => b.score - a.score)
    const ol = document.createElement("ol");
    scoreboard.innerHTML = "";

    players.forEach(player => {
        const li = document.createElement("li")
        li.textContent = `${player.username} ${player.score}`
        ol.appendChild(li)
    })
    scoreboard.appendChild(ol)

    player.score = 0;
}

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////   EXECUTE   ///////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

drawScoreboard(players)
screen.addEventListener('click', () => {
    if (cicle == undefined) {
        beginGame()
        cicle = setInterval(gameCicle, FPS)
    }
})




