const PATH = '/assets/images/17goals/';
const BOARD = document.getElementById('game');

const game = {
    init: () => {
        const flipped = [];
        const num_cards = 10;
        let pairs = 0;
        arrGoals.sort(() => Math.random() - 0.5);
        arrGoals = arrGoals.slice(0, num_cards);
        arrGoals = arrGoals.concat(arrGoals);
        shuffleArray(arrGoals);

        for(let item of arrGoals) {
            let card = document.createElement('div');
            card.innerHTML = `<img src="${PATH}${item.image}">`;
            BOARD.appendChild(card);
        }

        let cards = BOARD.querySelectorAll('div');
        for(let card of cards) {
            card.onclick = function() {
                this.classList.add('flipped');
                flipped.push(this);            
                if (flipped.length === 2) {
                    if(flipped[0].innerHTML === flipped[1].innerHTML) {
                        pairs++;
                        flipped.length = 0;
                        console.log(pairs);
                        if(pairs === num_cards) {
                            game.win();
                        }
                    } else {
                        setTimeout(() => {
                            for (let item of flipped) {
                                item.classList.replace("flipped", "closing");
                            }
                            flipped.length = 0;
                        }, 1000, setTimeout(() => {
                            let toRemoveClass = BOARD.querySelectorAll(".closing");                        
                            for (let rmClass of toRemoveClass) {
                                rmClass.classList.remove("closing");
                            }
                        }, 1400))
                    }
                }

            }
        }
    },
    win: () => {
        window.winner = document.createElement('div');
        winner.classList.add('winner');
        winner.innerHTML = `<h1>Du vandt!</h1> <button onclick='game.reset()'><i class='material-icons'>Spil igen</i></button>`;
        var body = document.getElementsByTagName('body');
        body[0].appendChild(winner);
    },
    reset: () => {
        BOARD.innerHTML = "";
        winner.remove();
        pairs = 0;
        game.init();
    }
}

const shuffleArray = array => {
    let j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

game.init();
