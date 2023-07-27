let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function makeMove(index) {
  if (board[index] === '') {
    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].innerText = currentPlayer;
    
    if (checkWin()) {
      document.querySelector('.status').innerText = `Player ${currentPlayer} wins!`;
      disableBoard();
    } else if (board.every(cell => cell !== '')) {
      document.querySelector('.status').innerText = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.querySelector('.status').innerText = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function disableBoard() {
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeAttribute('onclick');
  }
}

function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].setAttribute('onclick', `makeMove(${i})`);
  }
  document.querySelector('.status').innerText = `Player ${currentPlayer}'s turn`;
}
