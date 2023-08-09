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
    console.log(gameBoardArray);

    return gameBoardArray;
  };
  return { playerInput, newGame };
})();

const playGame = () => {
  gameBoard.newGame();
  createGrid();
};

var player = 1;

const updatePlayer = () => {
  if (player === 1) player++;
  else player--;
};

const onPlayerInput = (position) => {
  gameBoard.playerInput(player, position);
  var playerSign = "";
  if (player === 1) playerSign = "X";
  else playerSign = "O";
  updatePlayer();

  return playerSign;
};

const createGrid = () => {
  const gridContainer = document.getElementById("grid-container");
  for (i = 0; i < 9; i++) {
    const gridItem = document.createElement("div");
    gridItem.id = i;
    gridItem.classList.add("grid-item");
    gridContainer.appendChild(gridItem);

    gridItem.addEventListener("click", () => {
      let position = gridItem.id;
      playerSign = onPlayerInput(position);
      gridItem.textContent = playerSign;
    });
  }
};

playGame();
