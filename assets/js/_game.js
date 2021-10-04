// importerer funktion fra model
import { GoalModel } from './model.js';
let arrGoalArray = GoalModel();
//console.log(arrGoalArray);

// Var til gameboard object
const gameboard = document.getElementById('game');
// Var til timer 
const timeboard = document.getElementById('timer');
// Var til antal kort
const num_cards = 10;
// Array til active cards
const arr_flipped = [];
// Var til matched pairs
let pairs = 0;
// Vars til timer function
let miliseconds = 0;
let seconds = "00";
let minutes = "00";
let timer_output = '00:00:00';
let timer;
// Initialiserer spillet
initGame(num_cards);

/**
 * Initialiser spil
 */
function initGame(num_cards) {
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
    if(!miliseconds) {
        startTimer();
        timer = setInterval(startTimer, 10);
    }

    divElm.classList.add('active');
    // Tilføjer element til array flipped
    arr_flipped.push(divElm);

    if(arr_flipped.length === 2) {

        if(arr_flipped[0].innerHTML === arr_flipped[1].innerHTML) {
            pairs++;
            arr_flipped.length = 0;
            if(pairs === num_cards) {
                // Spillet er slut
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

function startTimer() {    

    miliseconds++;
    miliseconds = (miliseconds < 10 ? '0' : "") + miliseconds;

    if(miliseconds > 99) {
        seconds++;
        seconds = (seconds < 10 ? "0" : "") + seconds;
        miliseconds = '00';
        if(seconds > 59) {
            minutes++;
            minutes = (minutes < 10 ? "0" : "") + minutes;
            seconds = 0;
        }
    }
    timeboard.innerText = minutes + ":" + seconds + ":" + miliseconds;
}
