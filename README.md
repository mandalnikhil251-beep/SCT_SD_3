# Sudoku Solver 🧩

A modern and interactive Sudoku Solver web application that automatically solves 9×9 Sudoku puzzles using the Backtracking Algorithm.

The application also generates a new random Sudoku puzzle whenever the user clicks the **New Puzzle** button.

## ✨ Features

- 🧩 Interactive 9×9 Sudoku grid
- 🎲 Random Sudoku puzzle generation
- 🧠 Automatic Sudoku solving
- ⚡ Backtracking algorithm
- ❌ Invalid Sudoku detection
- 🧹 Clear Board functionality
- 🔄 New Puzzle functionality
- 🔢 Puzzle information counter
- 🔒 Fixed puzzle numbers are protected
- 📱 Responsive design
- 🎨 Modern and user-friendly interface

## 🧠 How It Works

1. The application generates a valid completed Sudoku grid.
2. Random cells are removed to create an unsolved puzzle.
3. The user can enter numbers into the empty cells.
4. The **Solve Sudoku** button checks the puzzle.
5. The Backtracking Algorithm searches for a valid solution.
6. The missing numbers are automatically filled into the grid.

## 🔄 Random Puzzle Generation

Every time the **New Puzzle** button is clicked:

- A new valid Sudoku solution is generated.
- Random cells are removed.
- A different Sudoku puzzle is displayed.
- Given numbers are locked so they cannot be accidentally changed.

## ⚡ Algorithm Used

### Backtracking Algorithm

The solver searches for an empty cell and tries numbers from 1 to 9.

For each number, it checks:

- Whether the number already exists in the row
- Whether the number already exists in the column
- Whether the number already exists in the 3×3 box

If the number is valid, the algorithm places it and continues.

If the algorithm reaches a dead end, it goes back to the previous step and tries another number.

This process continues until the Sudoku is completely solved.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Git
- GitHub

## 📁 Project Structure

```text
Sudoku Solver/
│
├── index.html
├── style.css
├── script.js
└── README.md