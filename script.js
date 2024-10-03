let questionsCoun = document.querySelector(".questions-coun span")
let bulletsSpandsContainer = document.querySelector(".spans")
let ques = document.querySelector(".ques")
let answers = document.querySelector(".answers")
let bullets = document.querySelector(".bullets")
let resultContainer = document.querySelector(".resultContainer")
let currentIndex = 0
let submit = document.querySelector(".sub-btn")
let RightAnswer = 0;
let countDownInterval ;
let countdown = document.querySelector(".countdown")
    async function data(){
        const response =await fetch('html_question.json')
        const jsonResponse =await response.json()
        let questionsCount = jsonResponse.length;   
            createBullets(questionsCount)
            addData(jsonResponse[currentIndex], questionsCount)
            countDown(10, questionsCount)
            submit.addEventListener("click", ()=>{
                let rightAnswer = jsonResponse[currentIndex].right_answer    
                currentIndex++
                checkAnswer(rightAnswer, questionsCount)
                answers.innerHTML = ''
                ques.innerHTML = ''
                addData(jsonResponse[currentIndex], questionsCount)
                handleBullets()
                clearInterval(countDownInterval)
                countDown(10, questionsCount)
                showResults(questionsCount)
            })
}
data()
function createBullets(num){
    questionsCoun.innerHTML = num
    for(let i=0; i< num ; i++){
        let theBullets = document.createElement("span")
        if(i === 0){
            theBullets.className = "active"
        }
        bulletsSpandsContainer.appendChild(theBullets)
    }
}
function addData(questions, count){
   if(currentIndex < count){
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(questions.title)
    questionTitle.appendChild(questionText)
    ques.appendChild(questionTitle)
    for(let i=1; i <=4; i++){
        let mainDiv = document.createElement("div")
        mainDiv.className = "answer"
        let radioInput = document.createElement("input")
        radioInput.type = "radio"
        radioInput.name = "option"
        radioInput.id = `answer_${i}`
        radioInput.dataset.answer = questions[`answer_${i}`]
        if(i === 1){
            radioInput.checked = true
        }
        let theLabel = document.createElement("label")
        theLabel.htmlFor = `answer_${i}`
        let theLabelText = document.createTextNode(questions[`answer_${i}`])
        theLabel.appendChild(theLabelText)
        mainDiv.appendChild(radioInput)
        mainDiv.appendChild(theLabel)
        answers.appendChild(mainDiv)
        }
    }
}
function checkAnswer(rAnswer, count){
    let answerrs = document.getElementsByName("option")
    let theChoosenAnswer;
    for(let i=0; i< answerrs.length; i++){
        if(answerrs[i].checked){
            theChoosenAnswer = answerrs[i].dataset.answer
        }
    }
    if(rAnswer === theChoosenAnswer){
        RightAnswer++
    }
}
function handleBullets(){
    let bulletsSpan = document.querySelectorAll(".spans span")
    let arrayOfSpans = Array.from(bulletsSpan)
    arrayOfSpans.forEach((span, index) =>{
        if(index === currentIndex){
            span.className = "active"
        }
    })
}
function showResults(count){
    let theResults ;
    if(currentIndex === count){
        answers.remove()
        ques.remove()
        submit.remove()
        bullets.remove()
        if(RightAnswer > (count/2) && RightAnswer < count){
            theResults = `<span class="good">Good</span>, You answered ${RightAnswer} from ${count}`
        }else if(RightAnswer === count){
            theResults = `<span class="perfect">Perfect</span>, All Answers is right`
        }else{
            theResults = `<span class="bad">Bad</span>, You answered ${RightAnswer} from ${count}`
        }
        resultContainer.innerHTML = theResults   
        resultContainer.style.padding = '10px' 
        resultContainer.style.backgroundColor = 'white' 
        resultContainer.style.margin = '10px' 
        resultContainer.style.fontSize = '25px' 
    }
}
function countDown(duration, count){
    if(currentIndex <count){
        let minutes, seconds;
        countDownInterval =setInterval(function(){
            minutes = parseInt(duration / 60)
            seconds = parseInt(duration % 60)
            minutes = minutes < 10 ?`0${minutes}`:minutes
            seconds = seconds < 10 ?`0${seconds}`:seconds
            countdown.innerHTML = `${minutes}:${seconds}`
            if(--duration < 0){
                clearInterval(countDownInterval)
                submit.click()                
            }
        },1000)
    }
}