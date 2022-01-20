var quizBody = document.getElementById('codequiz')
var resultsEl = document.getElementById('results')
var finalScore = document.getElementById('finalscore')
var startBtn = document.getElementById('startbtn')
var checkScores = document.getElementById('highbtn')
var endGameBtns = document.getElementById('endGameBtns')
var submitScoreBtn = document.getElementById('submitScore')
var quizHome = document.getElementById('homepage')
var highscoreContainer = document.getElementById('highscore')
var highscoreDiv = document.getElementById('hs')
var highscoreNameInput = document.getElementById('user')
var highscoreNameDisplay = document.getElementById('hs-user')
var highscoreScoreDisplay = document.getElementById('hs-score')
var questionContainer = document.getElementById('questions')
var quizTimer = document.getElementById('timer')
var gameoverDiv = document.getElementById('gameover')
var buttonA = document.getElementById('a')
var buttonB = document.getElementById('b')
var buttonC = document.getElementById('c')
var buttonD = document.getElementById('d')


var quizQuestions = [
    {
        question: 'JavaScript does NOT have this function built-in, which is commonly used to print or display data in other languages.',
        choiceA: 'Output',
        choiceB: 'Display',
        choiceC: 'Show',
        choiceD: 'Speak',
        correctAnswer: 'a',
    },
    {
        question: 'In JavaScript, what element is used to store and manipulate text usually in multiples?',
        choiceA: 'Functions',
        choiceB: 'Arrays',
        choiceC: 'Strings',
        choiceD: 'Variables',
        correctAnswer: 'c',
    },
    {
        question: 'What is the name of the object that allows you to perform mathematical tasks with the interpreter?',
        choiceA: 'Count',
        choiceB: 'Number',
        choiceC: 'Solve',
        choiceD: 'Math',
        correctAnswer: 'd',
    },
    {
        question: 'In JavaScript, what is a block of code called that is used to perform a specific task?',
        choiceA: 'Function',
        choiceB: 'Declaration',
        choiceC: 'String',
        choiceD: 'Variable',
        correctAnswer: 'a',
    },
    {
        question: 'In JavaScript, what is used in conjunction with HTML to “react” to certain elements?',
        choiceA: 'RegExp',
        choiceB: 'Boolean',
        choiceC: 'Condition',
        choiceD: 'Events',
        correctAnswer: 'd',
    }
]

var timeRemaining = 90
var timerInterval
var score = 0
var finalQuestionIndex = quizQuestions.length
var currentQuestionIndex = 0
var correct

function generateQuizQuestion() {
    gameoverDiv.style.display = 'none'
    if (currentQuestionIndex === finalQuestionIndex) {
      return showScore()
    }
    var currentQuestion = quizQuestions[currentQuestionIndex]
    questionContainer.innerHTML = '<p>' + currentQuestion.question + '</p>'
    buttonA.innerHTML = currentQuestion.choiceA
    buttonB.innerHTML = currentQuestion.choiceB
    buttonC.innerHTML = currentQuestion.choiceC
    buttonD.innerHTML = currentQuestion.choiceD
}

function startQuiz() {
    gameoverDiv.style.display = 'none'
    quizHome.style.display = 'none'
    generateQuizQuestion()

    timerInterval = setInterval(function () {
      timeRemaining--
      quizTimer.textContent = 'Time remaining: ' + timeRemaining
  
      if (timeRemaining === 0) {
        clearInterval(timerInterval)
        showScore()
      }
    }, 1000)
    quizBody.style.display = 'block'
}

function showScore() {
    gameoverDiv.style.display = 'flex'
    quizBody.style.display = 'none'
    clearInterval(timerInterval)
    highscoreNameInput.value = ''
    document.getElementById('finalscore').innerHTML = "Hello"
}

submitScoreBtn.addEventListener('click', function highscore() {
    if (highscoreNameInput.value === '') {
        alert('Initials cannot be blank')
        return false
    } else {
        var savedHighscores =
        JSON.parse(localStorage.getItem('savedHighscores')) || []
        var currentUser = highscoreNameInput.value.trim()
        var currentHighscore = {
            name: currentUser,
            score: score,
        }
  
      gameoverDiv.style.display = 'none'
      highscoreContainer.style.display = 'flex'
      highscoreDiv.style.display = 'block'
      endGameBtns.style.display = 'flex'
  
      savedHighscores.push(currentHighscore)
      localStorage.setItem('savedHighscores', JSON.stringify(savedHighscores))
      generateHighscores()
    }
})

function generateHighscores() {
    highscoreNameDisplay.innerHTML = ''
    highscoreScoreDisplay.innerHTML = ''
    var highscores = JSON.parse(localStorage.getItem('savedHighscores')) || []
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement('li')
        var newScoreSpan = document.createElement('li')
        newNameSpan.textContent = highscores[i].name
        newScoreSpan.textContent = highscores[i].score
        highscoreNameDisplay.appendChild(newNameSpan)
        highscoreScoreDisplay.appendChild(newScoreSpan)
    }
}
  

function showScoreBoard() {
    quizHome.style.display = 'none'
    gameoverDiv.style.display = 'none'
    highscoreContainer.style.display = 'flex'
    highscore.style.display = 'block'
    endGameBtns.style.display = 'flex'
  
    generateHighscores()
}

function clearScore () {
    window.localStorage.clear()
    highscoreNameDisplay.textContent = ''
    highscoreScoreDisplay.textContent= ''
}

function replayQuiz () {
    highscoreContainer.style.display = 'none'
    gameoverDiv.style.display = 'none'
    quizHome.style.display = 'flex'
    timeLeft = 90
    score = 0
    currentQuestionIndex = 0
}

function checkAnswer (answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++
        alert('Correct!')
        currentQuestionIndex++
        generateQuizQuestion()
    } else if (
        answer !== correct && currentQuestionIndex !== finalQuestionIndex
    ) {
        alert('Incorrect!')
        currentQuestionIndex++
        generateQuizQuestion()
    } else {
        showScore()
    }
}


startBtn.addEventListener('click', startQuiz)