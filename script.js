//  #  |  #  |  #
// --------------
//  #  |  #  |  #
// --------------
//  #  |  #  |  #

const gameBoard = (() => {
  var gameBoardArray = [];

  const newGame = () => {
    for (let i = 0; i < 9; i++) {
      gameBoardArray[i] = "";
    }
  };

  const playerInput = (player, position) => {
    if (player === 1) {
      gameBoardArray[position] = "X";
    } else {
      gameBoardArray[position] = "O";
    }
    return gameBoardArray;
  };

  return { playerInput, newGame };
})();

const game = (() => {
  var player = 1;

  const updatePlayer = () => {
    if (player === 1) player++;
    else player--;
  };

  var xPositions = [];
  var oPositions = [];

  const onPlayerInput = (position) => {
    gameBoard.playerInput(player, position);

    var playerSign = "";
    if (player === 1) {
      playerSign = "✕";
      xPositions.push(position);
    } else {
      playerSign = "O";
      oPositions.push(position);
    }

    if (oPositions.length > 2 || xPositions.length > 2) {
      checkWin();
    }

    updatePlayer();

    return { playerSign, xPositions, oPositions };
  };

  var blocksFilled = 0;

  const createGrid = () => {
    const gridContainer = document.getElementById("grid-container");

    gridContainer.innerHTML = "";

    for (i = 0; i < 9; i++) {
      const gridItem = document.createElement("div");
      gridItem.id = i;
      gridItem.classList.add("grid-item");
      gridContainer.appendChild(gridItem);

      gridItem.addEventListener("click", () => {
        if (!gridItem.innerHTML) {
          blocksFilled++;
          let position = parseInt(gridItem.id, 10);
          playerSign = onPlayerInput(position).playerSign;
          gridItem.textContent = playerSign;
        }
      });
    }
  };

  const winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const overlay = document.getElementById("overlay");

  const checkWin = () => {
    const containsAll = (position, winArr) => {
      return winArr.every((element) => position.includes(element));
    };
    var winner = null;
    if (player === 1) {
      winCases.forEach((array) => {
        if (containsAll(xPositions, array) === true) winner = 1;
      });
    } else {
      winCases.forEach((array) => {
        if (containsAll(oPositions, array) === true) winner = 2;
      });
    }
    const p = document.createElement("p");
    if (winner) {
      switch (winner) {
        case 1:
          p.textContent = "X won";
          break;
        case 2:
          p.textContent = "O won";
          break;
      }
      overlay.appendChild(p);
    }
    console.log(blocksFilled);
    if (blocksFilled > 8) {
      p.textContent = "Draw";
      overlay.appendChild(p);
    }

    overlay.addEventListener("click", () => {
      playGame();
      overlay.innerHTML = "";
    });
  };

  const resetGame = () => {
    player = 1;
    blocksFilled = 0;
    oPositions = [];
    xPositions = [];
  };

  const playGame = () => {
    resetGame();
    gameBoard.newGame();
    createGrid();
  };

  return { playGame };
})();

game.playGame();
