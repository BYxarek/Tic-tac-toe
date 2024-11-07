            const board = document.getElementById("board");
            const message = document.getElementById("message");
            const scores = document.getElementById("scores");
            const modeSelect = document.getElementById("mode");
            let currentPlayer = "X";
            let scoreX = 0;
            let scoreO = 0;
            let gameMode = "friend";
            const cells = Array.from(document.getElementsByClassName("cell"));
            const winningCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            function startGame() {
                gameMode = modeSelect.value;
                resetBoard();
                message.textContent = `Player ${currentPlayer}'s turn`;
            }

            function checkWin() {
                return winningCombinations.some((combination) => {
                    return combination.every((index) => {
                        return cells[index].textContent === currentPlayer;
                    });
                });
            }

            function checkDraw() {
                return cells.every((cell) => cell.textContent !== "");
            }

            function handleClick(event) {
                const cell = event.target;
                if (cell.textContent === "") {
                    cell.textContent = currentPlayer;
                    cell.classList.add("clicked");
                    if (checkWin()) {
                        message.textContent = `Player ${currentPlayer} wins!`;
                        updateScore();
                        resetBoard();
                    } else if (checkDraw()) {
                        message.textContent = "Draw!";
                        resetBoard();
                    } else {
                        currentPlayer = currentPlayer === "X" ? "O" : "X";
                        message.textContent = `Player ${currentPlayer}'s turn`;
                        if (gameMode !== "friend" && currentPlayer === "O") {
                            computerMove();
                        }
                    }
                }
            }

            function updateScore() {
                if (currentPlayer === "X") {
                    scoreX++;
                } else {
                    scoreO++;
                }
                scores.textContent = `Score: Player X - ${scoreX}, Player O - ${scoreO}`;
            }

            function resetBoard() {
                cells.forEach((cell) => (cell.textContent = ""));
                currentPlayer = "X";
            }

            function computerMove() {
                let availableCells = cells.filter((cell) => cell.textContent === "");
                let move;
                if (gameMode === "easy") {
                    move = availableCells[Math.floor(Math.random() * availableCells.length)];
                } else if (gameMode === "medium") {
                    move = findBestMove("O") || availableCells[Math.floor(Math.random() * availableCells.length)];
                }
                if (move) {
                    move.textContent = "O";
                    move.classList.add("clicked");
                    if (checkWin()) {
                        message.textContent = `Player O wins!`;
                        updateScore();
                        resetBoard();
                    } else if (checkDraw()) {
                        message.textContent = "Draw!";
                        resetBoard();
                    } else {
                        currentPlayer = "X";
                        message.textContent = `Player ${currentPlayer}'s turn`;
                    }
                }
            }

            function findBestMove(player) {
                for (let combination of winningCombinations) {
                    let [a, b, c] = combination;
                    if (cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === "") {
                        return cells[c];
                    } else if (cells[a].textContent === player && cells[c].textContent === player && cells[b].textContent === "") {
                        return cells[b];
                    } else if (cells[b].textContent === player && cells[c].textContent === player && cells[a].textContent === "") {
                        return cells[a];
                    }
                }
                return null;
            }

            board.addEventListener("click", handleClick);