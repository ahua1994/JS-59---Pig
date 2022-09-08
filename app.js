let players = document.querySelectorAll(".player");
let p1 = players[0];
let p2 = players[1];

let win = false;
let die = document.querySelector("img");

let p1current = document.getElementById("current--0");
let p2current = document.getElementById("current--1");
let p1score = document.getElementById("score--0");
let p2score = document.getElementById("score--1");

let newGameButton = document.querySelector(".btn--new");
let rollButton = document.querySelector(".btn--roll");
let holdButton = document.querySelector(".btn--hold");

newGameButton.addEventListener("click", newGame);
rollButton.addEventListener("click", rollDie);
holdButton.addEventListener("click", holdTurn);

let p1turn = 0;
let p2turn = 0;
let p1total = 0;
let p2total = 0;

function rollDie() {
    let roll = Math.ceil(Math.random() * 6);
    die.src = `./images/dice-${roll}.png`;
    if (roll === 1) {
        if (p1.classList.contains("player--active")) {
            p1turn = 0;
            p1current.textContent = 0;
        } else {
            p2turn = 0;
            p2current.textContent = 0;
        }
        changeActive();
    } else {
        if (p1.classList.contains("player--active")) {
            p1turn += roll;
            p1current.textContent = p1turn;
        } else {
            p2turn += roll;
            p2current.textContent = p2turn;
        }
    }
}

function newGame() {
    die.src = "";
    p1turn = 0;
    p2turn = 0;
    p1total = 0;
    p2total = 0;
    p1current.textContent = 0;
    p2current.textContent = 0;
    p1score.textContent = 0;
    p2score.textContent = 0;
    if (p2.classList.contains("player--active")) {
        changeActive();
    }
    rollButton.disabled = false;
    holdButton.disabled = false;
    if (p1.classList.contains("player--winner")) {
        p1.classList.toggle("player--winner");
    } else if (p2.classList.contains("player--winner")) {
        p2.classList.toggle("player--winner");
    }
}

function holdTurn() {
    if (p1.classList.contains("player--active")) {
        p1total += p1turn;
        p1score.textContent = p1total;
        p1turn = 0;
        p1current.textContent = 0;
    } else {
        p2total += p2turn;
        p2score.textContent = p2total;
        p2turn = 0;
        p2current.textContent = 0;
    }
    checkForWin();
    changeActive();
}

function changeActive() {
    for (let player of players) {
        player.classList.toggle("player--active");
    }
}

function checkForWin() {
    if (p1total >= 100) {
        p1.classList.toggle("player--winner");
        rollButton.disabled = true;
        holdButton.disabled = true;
    }
    if (p2total >= 100) {
        p2.classList.toggle("player--winner");
        rollButton.disabled = true;
        holdButton.disabled = true;
        changeActive();
    }
}
