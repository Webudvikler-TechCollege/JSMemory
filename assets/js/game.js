// importerer funktion fra model
import { GoalModel } from './model.js';

//console.log(arrGoalArray);

// Gameboard
const gameboard = document.getElementById('game');
// Timeboard
const timeboard = document.getElementById('timer');
// Antal kort
const num_cards = 10;
// Array til active cards
const arr_flipped = [];
// Tæller par
let pairs = 0;
// Timer Vars
let miliseconds = '00';
let seconds = '00';
let minutes = '00';
let timer;

// Initialiserer spillet
initGame(num_cards);

/**
 * Initialiser spil
 */
function initGame(num_cards) {

    let arrGoalArray = GoalModel();
    // Sorter array tilfældigt
    arrGoalArray.sort(() => Math.random() - 0.5);
    // Slicer array til num_cards
    arrGoalArray = arrGoalArray.slice(0, num_cards);
    // Sammenkæder array med sig selv
    arrGoalArray = arrGoalArray.concat(arrGoalArray);
    // Sorter array tilfældigt
    arrGoalArray.sort(() => Math.random() - 0.5);

    // Looper goal array
    for(let card of arrGoalArray) {

        // Opretter div element med class
        let div = document.createElement('div');
        div.classList.add('flip-card-inner');

        // Opretter img med src og class og tilføjer til div 
        let img = document.createElement('img');
        img.setAttribute('src', `/assets/images/17goals/${card.image}`);
        img.classList.add('flip-card-front');
        div.appendChild(img);

        // Opretter div back element med class og tilføjer til div
        let back = document.createElement('div');
        back.classList.add('flip-card-back');
        div.appendChild(back);

        // Tilføjer click event til div
        back.addEventListener('click', function() {
            flipCard(this.parentNode);
        })

        // Appender div til gameboard
        gameboard.appendChild(div);
    }

    //console.log(arrGoalArray);
}

function flipCard(divElm) {
    if(!timer) {
        setTimer();
        timer = setInterval(setTimer, 10)
    }

    divElm.classList.add('active');
    // Tilføjer element til array flipped
    arr_flipped.push(divElm);

    if(arr_flipped.length === 2) {
        //console.log(arr_flipped);
        if(arr_flipped[0].innerHTML === arr_flipped[1].innerHTML) {
            pairs++;
            arr_flipped.length = 0;
            if(pairs === num_cards) {
                gameOver();
                clearInterval(timer);
            }
        } else {
            setTimeout(() => {
                for(let item of arr_flipped) {
                    item.classList.remove('active');
                }
                arr_flipped.length = 0;
            }, 1400);
        }
    }
}

function setTimer() {
    miliseconds++;
    miliseconds = (miliseconds < 10 ? '0' : "") + miliseconds;

    if(miliseconds > 99) {
        seconds++;
        seconds = (seconds < 10 ? '0' : "") + seconds;
        miliseconds = '00';

        if(seconds > 59) {
            minutes++;
            minutes = (minutes < 10 ? '0' : "") + minutes;
            seconds = '00';
        }
    }
    timeboard.innerText = `${minutes}:${seconds}:${miliseconds}`;
}

function gameOver() {
    let div = document.createElement('div');
    div.classList.add('gameover');
    
    let h1 = document.createElement('h1');
    h1.innerHTML = 'Spillet er færdigt';
    div.prepend(h1);

    let p = document.createElement('p');
    p.innerHTML = `Din tid er ${minutes}:${seconds}:${miliseconds}`;
    div.append(p);

    let btn = document.createElement('button');
    btn.innerText = 'Spil igen';
    btn.addEventListener('click', () => {
        reset();
    })
    div.append(btn);

    document.body.append(div);
}

function reset() {
    document.querySelector('.gameover').remove();
    gameboard.innerHTML = null;
    initGame(num_cards);
    pairs = 0;
    timer = null;
    timeboard.innerText = `00:00:00`;
    miliseconds = '00';
    seconds = '00';
    minutes = '00';
}


