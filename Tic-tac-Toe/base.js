// Keep track of whose turn it is
let turn = "X";
let gameActive = true;

// The function called by your HTML onclick attributes
function mark(cellNumber) {
    const cell = document.getElementById(`c${cellNumber}`);

    // Only allow a mark if the cell is empty and the game isn't over
    if (cell.value === "" && gameActive) {
        cell.value = turn;
        
        if (checkWin()) {
            alert(`Player ${turn} wins!`);
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            alert("It's a draw!");
            gameActive = false;
            return;
        }

        // Switch turns
        if (turn === "X") {
            turn = "O";
        } else {
            turn = "X";
        }
    }
}

function checkWin() {
    // Get all values from the inputs
    const v1 = document.getElementById("c1").value;
    const v2 = document.getElementById("c2").value;
    const v3 = document.getElementById("c3").value;
    const v4 = document.getElementById("c4").value;
    const v5 = document.getElementById("c5").value;
    const v6 = document.getElementById("c6").value;
    const v7 = document.getElementById("c7").value;
    const v8 = document.getElementById("c8").value;
    const v9 = document.getElementById("c9").value;

    // Define all 8 possible winning combinations
    const winConditions = [
        [v1, v2, v3], [v4, v5, v6], [v7, v8, v9], // Rows
        [v1, v4, v7], [v2, v5, v8], [v3, v6, v9], // Columns
        [v1, v5, v9], [v3, v5, v7]                // Diagonals
    ];

    // Check if any combination is filled with the same (non-empty) symbol
    return winConditions.some(combo => {
        return combo[0] !== "" && combo[0] === combo[1] && combo[1] === combo[2];
    });
}

function checkDraw() {
    // Check if every cell has a value
    for (let i = 1; i <= 9; i++) {
        if (document.getElementById(`c${i}`).value === "") {
            return false;
        }
    }
    return true;
}

function resetGame() {
    // 1. Clear all the input values
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`c${i}`).value = "";
    }

    // 2. Reset the game variables
    turn = "X";
    gameActive = true;

    // 3. Optional: Log to console so you know it worked
    console.log("Game Reset!");
}