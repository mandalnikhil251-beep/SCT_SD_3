const board = document.getElementById("sudokuBoard");
const solveBtn = document.getElementById("solveBtn");
const clearBtn = document.getElementById("clearBtn");
const newBtn = document.getElementById("newBtn");
const message = document.getElementById("message");


// Create the 9 × 9 Sudoku board
function createBoard() {

    board.innerHTML = "";

    for (let i = 0; i < 81; i++) {

        const cell = document.createElement("input");

        cell.type = "number";
        cell.className = "cell";

        cell.min = "1";
        cell.max = "9";

        cell.setAttribute("maxlength", "1");

        cell.dataset.index = i;

        // Allow only numbers 1–9
        cell.addEventListener("input", function () {

            if (this.value < 1 || this.value > 9) {
                this.value = "";
            }

            if (this.value.length > 1) {
                this.value = this.value.slice(0, 1);
            }
        });

        board.appendChild(cell);
    }
}


// Read the current Sudoku board
function getBoard() {

    const cells = document.querySelectorAll(".cell");

    const grid = [];

    for (let row = 0; row < 9; row++) {

        const currentRow = [];

        for (let col = 0; col < 9; col++) {

            const index = row * 9 + col;

            const value = Number(cells[index].value) || 0;

            currentRow.push(value);
        }

        grid.push(currentRow);
    }

    return grid;
}


// Put solved values back into the board
function displayBoard(grid) {

    const cells = document.querySelectorAll(".cell");

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const index = row * 9 + col;

            cells[index].value = grid[row][col];
        }
    }
}


// Check whether a number can be placed
function isValid(grid, row, col, number) {

    // Check row
    for (let x = 0; x < 9; x++) {

        if (grid[row][x] === number) {
            return false;
        }
    }


    // Check column
    for (let x = 0; x < 9; x++) {

        if (grid[x][col] === number) {
            return false;
        }
    }


    // Check 3 × 3 box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);

    for (let i = 0; i < 3; i++) {

        for (let j = 0; j < 3; j++) {

            if (
                grid[startRow + i][startCol + j] === number
            ) {
                return false;
            }
        }
    }

    return true;
}

// Shuffle numbers randomly
function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


// Generate a completely solved Sudoku
function generateSolvedBoard() {

    const grid = Array.from(
        { length: 9 },
        () => Array(9).fill(0)
    );

    function fillGrid() {

        for (let row = 0; row < 9; row++) {

            for (let col = 0; col < 9; col++) {

                if (grid[row][col] === 0) {

                    const numbers = shuffle(
                        [1, 2, 3, 4, 5, 6, 7, 8, 9]
                    );

                    for (const number of numbers) {

                        if (isValid(grid, row, col, number)) {

                            grid[row][col] = number;

                            if (fillGrid()) {
                                return true;
                            }

                            grid[row][col] = 0;
                        }
                    }

                    return false;
                }
            }
        }

        return true;
    }

    fillGrid();

    return grid;
}

// Create a playable Sudoku puzzle
function generateRandomPuzzle() {

    // First generate a complete valid Sudoku
    const solvedGrid = generateSolvedBoard();

    // Make a copy so the original solution stays safe
    const puzzle = solvedGrid.map(row => [...row]);

    // Number of cells to remove
    const cellsToRemove = 45;

    let removed = 0;

    while (removed < cellsToRemove) {

        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        // Remove only if the cell still has a number
        if (puzzle[row][col] !== 0) {

            puzzle[row][col] = 0;

            removed++;
        }
    }

    return puzzle;
}

function updatePuzzleInfo() {

    const cells = document.querySelectorAll(".cell");

    let given = 0;
    let empty = 0;

    cells.forEach(cell => {

        if (cell.value !== "") {
            given++;
        } else {
            empty++;
        }
    });

    document.getElementById("givenCount").textContent = given;
    document.getElementById("emptyCount").textContent = empty;
}

// Backtracking Sudoku algorithm
function solveSudoku(grid) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            // Find an empty cell
            if (grid[row][col] === 0) {

                // Try numbers 1–9
                for (let number = 1; number <= 9; number++) {

                    if (isValid(grid, row, col, number)) {

                        grid[row][col] = number;

                        // Recursively solve remaining cells
                        if (solveSudoku(grid)) {
                            return true;
                        }

                        // Backtrack
                        grid[row][col] = 0;
                    }
                }

                return false;
            }
        }
    }

    return true;
}


// Check whether the starting Sudoku is valid
function isInitialBoardValid(grid) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const number = grid[row][col];

            if (number !== 0) {

                grid[row][col] = 0;

                if (!isValid(grid, row, col, number)) {

                    grid[row][col] = number;

                    return false;
                }

                grid[row][col] = number;
            }
        }
    }

    return true;
}


// Solve button
solveBtn.addEventListener("click", function () {

    const grid = getBoard();

    if (!isInitialBoardValid(grid)) {

        message.textContent =
            "❌ Invalid Sudoku! Please check duplicate numbers.";

        return;
    }

    const solved = solveSudoku(grid);

    if (solved) {

        displayBoard(grid);

        message.textContent =
            "🎉 Sudoku solved successfully!";
    } else {

        message.textContent =
            "⚠️ This Sudoku puzzle has no solution.";
    }
});


// Clear button
clearBtn.addEventListener("click", function () {

    createBoard();

    message.textContent =
        "🧹 Board cleared. Enter a new Sudoku puzzle.";
});


newBtn.addEventListener("click", function () {

    createBoard();

    const puzzle = generateRandomPuzzle();

    const cells = document.querySelectorAll(".cell");

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const index = row * 9 + col;

            if (puzzle[row][col] !== 0) {

                cells[index].value = puzzle[row][col];

                cells[index].readOnly = true;

                cells[index].style.background = "#e2e8f0";
            }
        }
    }

    message.textContent =
        "🧩 New random Sudoku generated! Try solving it.";

    updatePuzzleInfo();
});

// Create a random puzzle when page loads
createBoard();

const initialPuzzle = generateRandomPuzzle();
const initialCells = document.querySelectorAll(".cell");

for (let row = 0; row < 9; row++) {

    for (let col = 0; col < 9; col++) {

        const index = row * 9 + col;

        if (initialPuzzle[row][col] !== 0) {

            initialCells[index].value = initialPuzzle[row][col];

            initialCells[index].readOnly = true;

            initialCells[index].style.background = "#e2e8f0";
        }
    }
}

message.textContent =
    "🧩 Random Sudoku ready! Try solving it.";