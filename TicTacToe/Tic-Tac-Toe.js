const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var currentplayer
let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];
let Player = '';
let computer = '';
//reset board
function resetBoard() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
}

//toss
function coinFlip() {
    return Math.random() < 0.5 ? 'player' : 'computer';
}
/// printboard
function printBoard() {
    for (let i = 0; i < 3; i++) {
        console.log(board[i].join(' | '));
        if (i < 2) {
            console.log('---------');
        }
    }
    console.log('\n');
}
// choose X Or O
function startGame() {
    const tossResult = coinFlip();
    if (tossResult === Player) {
        rl.question(`Coin flip result: It's ${tossResult}'s turn. Player, choose 'X' or 'O': `, (choice) => {
            if (choice === 'X' || choice === 'O') {
                Player = choice;
                computer = Player === 'X' ? 'O' : 'X';
                resetBoard()
                console.log(`Player is '${Player}' and computer is '${computer}'.`);
                console.log(`Player '${Player}' goes first.`);
                currentplayer=Player
                playGame()
            } else {
                console.log("Invalid choice. Enter 'X' or 'O'.");
                startGame();
            }
        });
    }
    else {
        console.log("toss win by computer")
        computer = Math.random() < 0.5 ? 'X' : 'O';
        Player = computer === 'X' ? 'O' : 'X'
        resetBoard()
        console.log(`computer is '${computer}' and player is '${Player}'.`);
        console.log(`computer '${computer}' goes first.`);
        currentplayer=computer
        playGame()
    }
}
function makeMove(i, j) {
    if (board[i][j] === ' ') {
        board[i][j] = Player;
        return true;
    } else {
        console.log('Invalid move. Try again.');
        playerMove()
        return false;
    }
}
function playGame() {
    if (currentplayer === Player) {
        playerMove();
        } else {
        computerMove();
        if (!isGameOver()) {
          playerMove() 
        }
    }currentplayer=Player?computer:Player
}

function checkWinplayer() {
    // Check win
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
function checkWinComputer() {
    // Check win
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] === computer &&
            board[i][1] === computer &&
            board[i][2] === computer
        ) {
            return true;
        }
        if (
            board[0][i] === computer &&
            board[1][i] === computer &&
            board[2][i] === computer
        ) {
            return true;
        }
    }
    if (
        (board[0][0] === computer && board[1][1] === computer && board[2][2] === computer) ||
        (board[0][2] === computer && board[1][1] === computer && board[2][0] === computer)
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
    continueplay()
    return true;

}
function isGameOver() {
    if (checkWinplayer(Player)) {
        printBoard();
        console.log(`Player ${Player} wins!`);
        return true;
        
    } if (checkWinComputer(computer)) {
        printBoard();
        console.log(`computer ${computer} wins!`);
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
           playGame()
            return;
        }

        const [i, j] = input.split(' ').map(Number);

        if (i >= 0 && i < 3 && j >= 0 && j < 3) {
            if (makeMove(i, j) && !isGameOver()) {
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
               
                if (checkWinComputer(computer)) {
                    return; // computer can win, make the winning move
                }
                board[i][j] = ' ';
               // Reset the move
            }
        }
    }

    // Check if the player (opponent) can win in the next move and play to block
   
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ' ') {
                board[i][j] = Player;
              
                if (checkWinplayer(Player)) {
                    board[i][j] = computer;
                    // Block the player
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
       
    }

    // if (board[1][1] === ' ') {
    //     board[1][1] = computer;
    //     return;
    // }
    const sideMoves = [
        [0, 1], [1, 0], [1, 2], [2, 1]
    ];
 
    for (const move of sideMoves) {
        const [i, j] = move;
        if (board[i][j] === ' ') {
            board[i][j] = computer;
            
            return;
        }
       
    }}

function continueplay() {
    rl.question(`Are you want to play again confirm with continue `, (input) => {
        if (input.toLowerCase() === 'continue') {
            startGame();

        }
        else
            process.exit()
    })

}
startGame()
