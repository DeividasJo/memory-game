let numbers = [];
const board = document.querySelector('.game');
let prew;
let prewHTML;
let waiting = false;
const start = document.querySelector('.start');
let squares;


function startGame(){
    // 1 create numbers
    for (let x = 1; x <= 6; x++) {
        numbers.push(x, x);
    }

// 2 shuffle array
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    numbers = shuffle(numbers);

// 3 create 12 squares

    numbers.forEach((number) => {
        var square = `<div data-n="${number}" class="square"></div>`;
        board.insertAdjacentHTML("afterbegin", square)

    });

// 4 select all squares

     squares = document.querySelectorAll('.square');

// 5 addEventListener on squares
    squares.forEach((square) => {
        square.addEventListener('click', () => {
            if (waiting) return; // if while there's waiting we're stopping code

            const n = square.dataset.n;
            square.textContent = n;
            // 6 set prew on clicked number
            if (!prew) {
                prew = n;
                prewHTML = square;
            } else {
                waiting = true; // if there's no waiting we're set it to TRUE

                // if prew number doesn't match clicked number
                if (prew !== n) {
                    setTimeout(() => {
                        square.textContent = ''; // deleting clicked number
                        prewHTML.textContent = '';
                        prew = null;
                        prewHTML = null;
                        waiting = false;
                    }, 1500)
                } else { // if prew number matches clicked number
                    if (square === prewHTML) return waiting = false; //if value is the same we're checking if divs are the same (double clicked on the same square)
                    prew = null;
                    prewHTML = null;
                    waiting = false;
                }
            }


        })
    });
}

startGame()

start.addEventListener('click', ()=>{
    if(waiting) return;
    squares.forEach((square)=>{
        board.removeChild(square);
        numbers=[];
    });
    startGame();
    rew = null;
    prewHTML = null;
});