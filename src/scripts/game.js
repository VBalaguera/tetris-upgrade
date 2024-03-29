//tetris game script:

//script here:

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')

  //ADDED LATER: DIFFICULTY BUTTONS
  const extremeBtn = document.querySelector('#extreme')
  const hardestBtn = document.querySelector('#hardest')
  const hardBtn = document.querySelector('#hard')
  const normalBtn = document.querySelector('#normal')
  const easyBtn = document.querySelector('#easy')

  //ADDED LATER: RESTART BUTTON
  const restartBtn = document.querySelector('#restart')

  //ADDED LATER: MOBILE CONTROLS
  const mobileLeftBtn = document.querySelector('#mobile-left')
  const mobileRightBtn = document.querySelector('#mobile-right')
  const mobileDownBtn = document.querySelector('#mobile-down')
  const mobilePauseBtn = document.querySelector('#mobile-pause')
  const mobileRotationBtn = document.querySelector('#mobile-rotation')

  const width = 10
  let nextRandom = 0
  let timerId
  let difficulty
  let score = 0
  const colors = [
    'rgb(238, 170, 31)', //EEAA1F L tetromino
    'rgb(16, 154, 72)', //109A48 S tetromino
    'rgb(38, 59, 130)', //263B82 Z tetromino
    'rgb(153, 27, 30)', //991B1E T
    'rgb(100, 34, 101)', //642265 O
    'rgb(0, 90, 157)', //005A9D I

    'rgb(179, 90, 39)', //B35A27
  ]

  //The Tetrominoes

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ]

  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [2, width + 2, width * 2 + 2, width * 2 + 1],
    [width + 1, width * 2 + 1, width * 2 + 2, width * 2 + 3],
  ]

  //  TODO: revisit this
  const jTetromino = [
    [1, width + 2, width * 2 + 2, 2], // correct
    [3, width + 3, width + 2, width + 1], // correct
    [2, width + 2, width * 2 + 2, width * 2 + 3], // correct
    [width + 1, width + 2, width + 3, width * 2 + 1], // correct
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ]

  const sTetromino = [
    [1, width, width + 1, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [1, width, width + 1, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
  ]

  const theTetrominoes = [
    lTetromino,
    jTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
    sTetromino,
    zTetromino,
  ]

  let currentPosition = 4
  let currentRotation = 0

  //randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  //draw the Tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino')
      squares[currentPosition + index].style.backgroundColor = colors[random]
    })
  }

  //undraw the Tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove('tetromino')
      squares[currentPosition + index].style.backgroundColor = ''
    })
  }

  //assign functions to keyCodes
  function control(e) {
    if (e.keyCode === 65) {
      //37 for left arrow
      moveLeft()
    } else if (e.keyCode === 87) {
      //38 for up arrow
      rotate()
    } else if (e.keyCode === 68) {
      //39 for right arrow
      moveRight()
    } else if (e.keyCode === 83) {
      //40 for down arrow
      moveDown()
    } else if (e.keyCode === 82) {
      //R assigned to RESTART!
      this.location.reload()
    }
  }
  document.addEventListener('keyup', control)

  //move down function
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  mobileDownBtn.addEventListener('click', moveDown)

  //freeze function
  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains('taken')
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add('taken')
      )
      //start a new tetromino falling
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }

  //move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    )
    if (!isAtLeftEdge) currentPosition -= 1
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition += 1
    }
    draw()
  }

  mobileLeftBtn.addEventListener('click', () => {
    undraw()
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    )
    if (!isAtLeftEdge) currentPosition -= 1
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition += 1
    }
    draw()
  })

  //move the tetromino right, unless is at the edge or there is a blockage
  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    )
    if (!isAtRightEdge) currentPosition += 1
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition -= 1
    }
    draw()
  }

  mobileRightBtn.addEventListener('click', () => {
    undraw()
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    )
    if (!isAtRightEdge) currentPosition += 1
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition -= 1
    }
    draw()
  })

  ///FIX ROTATION OF TETROMINOS A THE EDGE
  function isAtRight() {
    return current.some((index) => (currentPosition + index + 1) % width === 0)
  }

  function isAtLeft() {
    return current.some((index) => (currentPosition + index) % width === 0)
  }

  function checkRotatedPosition(P) {
    P = P || currentPosition //get current position.  Then, check if the piece is near the left side.
    if ((P + 1) % width < 4) {
      //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).
      if (isAtRight()) {
        //use actual position to check if it's flipped over to right side
        currentPosition += 1 //if so, add one to wrap it back around
        checkRotatedPosition(P) //check again.  Pass position from start, since long block might need to move more.
      }
    } else if (P % width > 5) {
      if (isAtLeft()) {
        currentPosition -= 1
        checkRotatedPosition(P)
      }
    }
  }

  //rotate the tetromino
  function rotate() {
    undraw()
    currentRotation++
    if (currentRotation === current.length) {
      //if the current rotation gets to 4, make it go back to 0
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    checkRotatedPosition()
    draw()
  }

  mobileRotationBtn.addEventListener('click', function () {
    rotate()
  })

  //show up-next tetromino in mini-grid display
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  const displayIndex = 0

  //tetrominoes inside the minigrid that displays them before entering the grid;
  // the idea is to reuse the first "frame"
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino, correct
    [1, displayWidth + 2, displayWidth * 2 + 2, 2], // jtetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
    [0, 1, displayWidth, displayWidth + 1], //oTetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
    [1, displayWidth, displayWidth + 1, displayWidth * 2], // stetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
  ]

  //display the shape in the mini-grid display
  function displayShape() {
    //remove any trace of a tetromino form the entire grid
    displaySquares.forEach((square) => {
      square.classList.remove('tetromino')
      square.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add('tetromino')
      displaySquares[displayIndex + index].style.backgroundColor =
        colors[nextRandom]
    })
  }

  //add functionality to the button;
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      difficulty = 0
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      displayShape()
    }
  })

  normalBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 800)
      difficulty = 1
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      displayShape()
    }
  })

  hardBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 500)
      difficulty = 2
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      displayShape()
    }
  })

  hardestBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 300)
      difficulty = 3
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      displayShape()
    }
  })

  extremeBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 100)
      difficulty = 4
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      displayShape()
    }
  })

  //add score
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ]

      if (row.every((index) => squares[index].classList.contains('taken'))) {
        // TODO: increase

        switch (difficulty) {
          case 0:
            // easy difficulty
            score += 10
            break
          case 1:
            // normal difficulty
            score += 30
            break
          case 2:
            // hard difficulty
            score += 60
            break
          case 3:
            // hardest difficulty
            score += 75
            break
          case 4:
            // extreme difficulty
            score += 100
            break
        }
        // score += 10
        scoreDisplay.innerHTML = score
        row.forEach((index) => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
          squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach((cell) => grid.appendChild(cell))
      }
    }
  }

  //game over
  function gameOver() {
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      scoreDisplay.innerHTML = 'end'
      clearInterval(timerId)
      window.alert('lol game over')
      // TODO: save score on Firebase!
    }
  }

  //restarting/reloading
  restartBtn.addEventListener('click', function () {
    window.location.reload()
  })
})
