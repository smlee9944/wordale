window.addEventListener("DOMContentLoaded", (event) => {
  const gameBlocks = document.querySelectorAll(".board-block");
  const answer = "apple";
  const totalRows = 6;
  const totalCols = 5;
  let currentInput = "";
  let currentBlockIndex = 0;
  let currentRow = 0;
  let isGameEnded = false;
  let redBlocks = [];

  function updateGameBlocks() {
    gameBlocks.forEach((block, index) => {
      const row = Math.floor(index / totalCols);
      const col = index % totalCols;

      if (row <= currentRow && col < totalCols) {
        if (row === currentRow && col < currentInput.length) {
          block.textContent = currentInput[col];
          if (currentInput[col] === answer[currentBlockIndex]) {
            block.style.backgroundColor = "lime";
          } else if (answer.includes(currentInput[col])) {
            block.style.backgroundColor = "yellow";
          } else if (redBlocks.includes(index)) {
            block.style.backgroundColor = "red";
          } else {
            block.style.backgroundColor = "";
          }
        } else {
          if (
            row < currentRow ||
            (row === currentRow && col < currentInput.length)
          ) {
            if (redBlocks.includes(index)) {
              block.style.backgroundColor = "red";
            } else if (answer.includes(block.textContent)) {
              block.style.backgroundColor = "yellow";
            } else {
              block.style.backgroundColor = "";
            }
          } else {
            block.style.backgroundColor = "";
          }
        }
      }
    });
  }

  function checkAnswer() {
    if (currentInput === answer) {
      gameBlocks.forEach((block, index) => {
        const row = Math.floor(index / totalCols);
        const col = index % totalCols;
        if (row === currentRow && col < currentInput.length) {
          block.style.backgroundColor = "lime";
        }
      });
      alert("Congratulations! You won!");
      isGameEnded = true;
    } else {
      gameBlocks.forEach((block, index) => {
        const row = Math.floor(index / totalCols);
        const col = index % totalCols;
        if (row === currentRow && col < currentInput.length) {
          if (answer.includes(block.textContent)) {
            block.style.backgroundColor = "yellow";
          } else {
            block.style.backgroundColor = "";
          }
        }
      });
      alert("Incorrect Answer! Try again.");
    }
  }

  function handleKeyDown(event) {
    if (isGameEnded) return;

    const letter = event.key.toLowerCase();

    if (/^[a-z]$/.test(letter) && currentInput.length < totalCols) {
      currentInput += letter;
      currentBlockIndex++;
      updateGameBlocks();
    } else if (event.key === "Backspace") {
      if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        currentBlockIndex--;
        updateGameBlocks();
      }
    }
  }

  function handleKeyUp(event) {
    if (event.keyCode === 13) {
      if (currentInput.length === totalCols) {
        checkAnswer();
        if (!isGameEnded) {
          currentRow++;
          redBlocks = redBlocks.filter(
            (blockIndex) => blockIndex < currentRow * totalCols
          );
          currentBlockIndex = currentRow * totalCols;
          currentInput = "";
          updateGameBlocks();
        }
      }
    }
  }

  function handleKeyPress(event) {
    if (isGameEnded) return;

    const letter = event.key.toLowerCase();

    if (/^[a-z]$/.test(letter) && currentInput.length === 0) {
      currentInput = letter;
      currentBlockIndex = 1;
      updateGameBlocks();
    }
  }

  updateGameBlocks();

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("keypress", handleKeyPress);
});
