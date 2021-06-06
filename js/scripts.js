const question = document.querySelector("#question")
const answersBox = document.querySelector("#answers-box")
const quizzContainer = document.querySelector("#quizz-container")
const scoreContainer = document.querySelector("#score-container")
const letters = ["a", "b", "c", "d"]
let points = 0
let actualQuestion = 0

//questions

const questions = [
    {
      "question": " - O PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": " - Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": " - Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
    {
      "question": " - Qual tag usamos para criar um parágrafo no HTML?",
      "answers": [
        {
          "answer": "<h1>",
          "correct": false
        },
        {
          "answer": "<img>",
          "correct": false
        },
        {
          "answer": "<ul>",
          "correct": false
        },
        {
          "answer": "<p>",
          "correct": true
        },
      ]
    },

    {
      "question": " - Para o elemento basear sua posição no elemento pai usamos o position:?",
      "answers": [
        {
          "answer": "relative",
          "correct": false
        },
        {
          "answer": "fixed",
          "correct": false
        },
        {
          "answer": "absolute",
          "correct": true
        },
        {
          "answer": "static",
          "correct": false
        },
      ]
    },
]

// first question
function init(){
    // create first question
    createQuestion(0)
}
// create a question
function createQuestion(i) {
    //clean previous question
    const oldButtons = answersBox.querySelectorAll("button")
    oldButtons.forEach(function(btn){
        btn.remove()
    })

    //change question text
    const questionText = question.querySelector("#question-text")
    const questionNumber = question.querySelector("#question-number")

    questionText.textContent = questions[i].question
    questionNumber.textContent = i +1

    //insert alternatives
    questions[i].answers.forEach(function(answer, i){

        //create template button quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true)

        const letterBtn = answerTemplate.querySelector(".btn-letter")
        const answerText = answerTemplate.querySelector(".question-answer")

        letterBtn.textContent = letters[i]
        answerText.textContent = answer['answer']

        answerTemplate.setAttribute("correct-answer", answer["correct"])

        //remove hide and template class
        answerTemplate.classList.remove("hide")
        answerTemplate.classList.remove("answer-template")

        // insert alternative in screen
        answersBox.appendChild(answerTemplate)

        //insert event click
        answerTemplate.addEventListener("click", function(){
            checkAnswer(this)
        })
    })

    //increment question number
    actualQuestion++

}

// check user answer
function checkAnswer(btn){
    //select all buttons
    const buttons = answersBox.querySelectorAll("button")
    //check if the answer is correct
    buttons.forEach(function(button){

        if(button.getAttribute("correct-answer") == "true"){
            button.classList.add("correct-answer")

            //check if user is correct
            if(btn === button){
                //increase points
                points++
            }
        }else{
            button.classList.add("wrong-answer")
        }
    })
    //display next question
    nextQuestion()
}

function nextQuestion(){

    // timer for user to see answers
    setTimeout(function(){

        //check for questions
        if(actualQuestion >= questions.length){
            // success msg
            showSuccessMessage()
            return
        }

        createQuestion(actualQuestion)

    }, 700)
}

//show final screen
function showSuccessMessage() {
    hideOrShowQuizz();

    //chance datas sucess screen

    //calc score
    const score = ((points / questions.length) * 100).toFixed(2)

    const displayScore = document.querySelector("#display-score span")
    displayScore.textContent = score.toString()

    //change the number of correct questions
    const correctAnswers = document.querySelector("#correct-answers")
    correctAnswers.textContent = points

    //change the total of correct questions
    const totalQuestions = document.querySelector("#questions-qty")
    totalQuestions.textContent = questions.length

    const msgFinal = document.querySelector("#msg-final")
    const changeFinal = "Que pena, vc não passou no teste."
    if(totalQuestions < 3){
      msgFinal.textContent = changeFinal
}


}

// hide or show score
function hideOrShowQuizz(){
    quizzContainer.classList.toggle("hide")
    scoreContainer.classList.toggle("hide")
}

//reset quizz
const restartBtn = document.querySelector("#restart")
restartBtn.addEventListener("click", function(){

    actualQuestion = 0
    points = 0
    hideOrShowQuizz();
    init()
})


// inicialize quizz
init()