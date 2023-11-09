const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];
let Player = '';
let computer = '';


function printBoard() {
    for (let i = 0; i < 3; i++) {
        console.log(board[i].join(' | '));
        if (i < 2) {
            console.log('---------');
        }
    }
    console.log('\n');
}

function makeMove(i, j) {
    if (board[i][j] === ' ') {
        board[i][j] = Player;
        return true;
    } else {
        console.log('Invalid move. Try again.');
        return false;
    }
}
// function switchPlayer() {
//     Player = Player === 'X' ? 'O' : 'X';
// }
function checkWin() {
    // Check is, jumns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] === Player &&
            board[i][1] === Player &&
            board[i][2] === Player
        ) {
            return true;
        }
        if (
            board[0][i] === Player &&
            board[1][i] === Player &&
            board[2][i] === Player
        ) {
            return true;
        }
    }
    if (
        (board[0][0] === Player && board[1][1] === Player && board[2][2] === Player) ||
        (board[0][2] === Player && board[1][1] === Player && board[2][0] === Player)
    ) {
        return true;
    }
    return false;
}
function checkDraw() {
    // Check for a draw
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ' ') {
                return false;
            }
        }
    }
    return true;
}
function resetBoard() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    
    
}
function playGame() {
    printBoard();

    rl.question(`Player ${Player}, enter your move (i and j), or type 'reset' to start a new game: `, (input) => {
        if (input.toLowerCase() === 'reset') {
            resetBoard();
            console.log('Board has been reset. Starting a new game.');
            playGame();
            return;
        }

        const [i, j] = input.split(' ').map(Number);

        if (i >= 0 && i < 3 && j >= 0 && j < 3) {
            if (makeMove(i, j)) {
                if (checkWin()) {
                    printBoard();
                    console.log(`Player ${Player} wins!`);
                    isGameRunning = false;
                } else if (checkDraw()) {
                    printBoard();
                    console.log("It's a draw!");
                    isGameRunning = false;
                } else {
                    
                    playGame();
                }
            } else {
                playGame();
            }
        } else {
            console.log('Invalid input. Enter i and j values between 0 and 2, or type "reset" to start a new game.');
            playGame();
        }
    });

}
function isGameOver() {
    if (checkWin(Player)) {
        printBoard();
        console.log(`Player ${Player} wins!`);
        return true;
    }
    if (checkDraw()) {
        printBoard();
        console.log("It's a draw!");
        return true;
    }
    return false;
}
function playerMove() {
    printBoard();

    rl.question(`Player ${Player}, enter your move (i and j), or type 'reset' to start a new game: `, (input) => {
        if (input.toLowerCase() === 'reset') {
            resetBoard();
            console.log('Board has been reset. Starting a new game.');
            startGame();
            return;
        }

        const [i, j] = input.split(' ').map(Number);

        if (i >= 0 && i < 3 && j >= 0 && j < 3) {
            if (makeMove(i, j) && !isGameOver()) {
                // switchPlayer();
                computerMove();
                if (!isGameOver()) {
                    playGame();
                }
            }
        } else {
            console.log('Invalid input. Enter i and jumn values between 0 and 2.');
            playerMove();
        }
    });
}
function computerMove() {
    // Check if the computer can win in the next move and play to win
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ' ') {
                board[i][j] = computer;
                if (checkWin(computer)) {
                    return; // computer can win, make the winning move
                }
                board[i][j] = ' '; // Reset the move
            }
        }
    }

    // Check if the player (opponent) can win in the next move and play to block
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ' ') {
                board[i][j] = Player;
                if (checkWin(Player)) {
                    board[i][j] = computer; // Block the player
                    return;
                }
                board[i][j] = ' '; // Reset the move
            }
        }
    }

    // If there are no immediate winning moves, take one of the available corners
    const cornerMoves = [
        [0, 0], [0, 2], [2, 0], [2, 2]
    ];

    for (const move of cornerMoves) {
        const [i, j] = move;
        if (board[i][j] === ' ') {
            board[i][j] = computer;
            return;
        }
        break
    }
    if (board[1][1] === ' ') {
        board[1][1] = computer;
        return;
    }
    const sideMoves = [
        [0, 1], [1, 0], [1, 2], [2, 1]
    ];

    for (const move of sideMoves) {
        const [i, j] = move;
        if (board[i][j] === ' ') {
            board[i][j] = computer;
            return;
            }
            break
    }
}
function coinFlip() {
    return Math.random() < 0.5 ? 'player' : 'computer';
}
function startGame() {
    
    const tossResult = coinFlip();
    rl.question(`Coin flip result: It's ${tossResult}'s turn. Player, choose 'X' or 'O': `, (choice) => {
        if (choice === 'X' || choice === 'O') {
            Player = choice;
            computer = Player === 'X' ? 'O' : 'X';
            resetBoard()
            console.log(`Player is '${Player}' and computer is '${computer}'.`);
            console.log(`Player '${Player}' goes first.`);
           playGame()
        } else {
            console.log("Invalid choice. Enter 'X' or 'O'.");
            startGame();
        }
    });
}
function playGame() {
    if (Player === 'X') {
        playerMove();
    } else {
        computerMove();
        if (!isGameOver()) {
            playerMove();
        }
    }
}

startGame()



