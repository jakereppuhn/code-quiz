var startQuiz = document.getElementById('startbtn')
var checkScores = document.getElementById('highbtn')
var quiz = document.getElementById('codequiz')
var quizHome = document.getElementById('homepage')
var highscore = document.getElementById('highscore')
var highscoreContainer = document.getElementById('hs')
var highscoreName = document.getElementById('user')
var questionBox = document.getElementById('questions')
var quizTimer = document.getElementById('timer')
var gameoverDiv = document.getElementById('gameover')
var finalScoreEl = document.getElementById('finalScore')
var resultsEl = document.getElementById('results')
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
    questionsBox.innerHTML = '<p>' + currentQuestion.question + '</p>'
    buttonA.innerHTML = currentQuestion.choiceA
    buttonB.innerHTML = currentQuestion.choiceB
    buttonC.innerHTML = currentQuestion.choiceC
    buttonD.innerHTML = currentQuestion.choiceD
  }

function startQuiz() {
    gameoverDiv.style.display = 'none'
    quizHome.style.display = 'none'
    generateQuizQuestion()
  
    //Timer
    timerInterval = setInterval(function () {
      timeRemaining--
      quizTimer.textContent = 'Time left: ' + timeRemaining
  
      if (timeRemaining === 0) {
        clearInterval(timerInterval)
        showScore()
      }
    }, 1000)
    quiz.style.display = 'block'
  }