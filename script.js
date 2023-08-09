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

  // const checkPosition = (letter) => {
  //   let field = gameBoardArray.map((a) => a === letter);
  //   return field;
  // };
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

var xPositions = [];
var oPositions = [];

const onPlayerInput = (position) => {
  gameBoard.playerInput(player, position);

  var playerSign = "";
  if (player === 1) {
    playerSign = "X";
    xPositions.push(position);
  } else {
    playerSign = "O";
    oPositions.push(position);
  }
  console.log(oPositions.length);
  console.log(xPositions.length);
  if (oPositions.length > 2 || xPositions.length > 2) {
    checkWin();
  }

  updatePlayer();

  return { playerSign, xPositions, oPositions };
};

const createGrid = () => {
  const gridContainer = document.getElementById("grid-container");
  for (i = 0; i < 9; i++) {
    const gridItem = document.createElement("div");
    gridItem.id = i;
    gridItem.classList.add("grid-item");
    gridContainer.appendChild(gridItem);

    gridItem.addEventListener("click", () => {
      let position = parseInt(gridItem.id, 10);
      playerSign = onPlayerInput(position).playerSign;
      gridItem.textContent = playerSign;
      // console.log(gameBoard.checkPosition("X"))
    });
  }
};

playGame();

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

const checkWin = () => {
  const containsAll = (position, winArr) => {
    console.log(position);
    console.log(winArr);
    return winArr.every((element) => position.includes(element));
  };
  if (player === 2) {
    console.log(oPositions);
    winCases.forEach((array) => {
      console.log(containsAll(oPositions, array));
    });
  } else {
    console.log(xPositions);
    winCases.forEach((array) => {
      console.log(containsAll(xPositions, array));
    });
  }
};
