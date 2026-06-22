// Selecting DOM Elements
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const cells = document.querySelectorAll('.cell');

// Game State State Management
let board = ["", "", "", "", "", "", "", "", ""]; // Simulating 3x3 grid using 1D Array
let currentPlayer = "X";
let isGameActive = true;

// Hardcoded Winning Combinations (Rows, Columns, and Diagonals)
const winningConditions = [
    [0, 1, 2], // Top Row
    [3, 4, 5], // Middle Row
    [6, 7, 8], // Bottom Row
    [0, 3, 6], // Left Column
    [1, 4, 7], // Middle Column
    [2, 5, 8], // Right Column
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

// Handles User click actions on cells
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Check if cell is already occupied or game is over
    if (board[clickedCellIndex] !== "" || !isGameActive) {
        return;
    }

    // Process the valid move
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Mutates the board array and updates interface
function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase()); // Triggers CSS neon styles
}

// Scans board matrix for win/draw patterns
function handleResultValidation() {
    let roundWon = false;

    // Evaluate all winning paths
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // Win evaluation logic
    if (roundWon) {
        statusElement.innerText = `Player ${currentPlayer} Wins!`;
        statusElement.style.color = currentPlayer === 'X' ? '#ff2a74' : '#00fff0';
        isGameActive = false;
        return;
    }

    // Draw evaluation logic (Checks if any cell is left empty)
    let roundDraw = !board.includes("");
    if (roundDraw) {
        statusElement.innerText = "Match Draw!";
        statusElement.style.color = "#e0e0e0";
        isGameActive = false;
        return;
    }

    // If no win or draw, pass turn
    handlePlayerChange();
}

// Switches state between 'X' and 'O'
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.innerText = `Player ${currentPlayer}'s turn`;
}

// Completely resets all parameters to state zero
function handleResetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    statusElement.innerText = `Player ${currentPlayer}'s turn`;
    statusElement.style.color = "#e0e0e0";
    
    // Clear DOM markers and styles
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('x', 'o');
    });
}

// Attaching Event Listeners to Interactive Nodes
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', handleResetGame);