function getElement(id) {
    if (document.getElementById(id) != null) {
        return document.getElementById(id);
    }
}

// Element Variables
const questionText = getElement("questionText")
    , questionCategoryText = getElement("questionCategory")
    , questionAuthorText = getElement("questionAuthor")
    , answerInputText = getElement("answer")
    , resultText = getElement("answerResult")

// Question Variables
const questionPool = new Map()
let currentQuestion;

// Statistics Variables
let numCorrect = 0, numIncorrect = 0;

function parseQuestionFile(fileName) {

    fetch("questions/" + fileName)
        .then(response => response.text()).then(data => {
            const lines = data.split('\n').map(line => line.trim()); // Trim each line

            lines.forEach(line => {
                const regex = /^([^:]+):([^:]+):(\[.*]):([^:]+)$/;
                const match = line.match(regex);

                if (match) {
                    const category = match[1].trim()
                        , question = match[2].trim()
                        , answers = JSON.parse(match[3].trim())
                        , author = match[4].trim();

                    questionPool.set(question, [answers, category, author]);
                } else { console.error('Invalid line format: ' + line); }
            });

            //console.log("Question Pool Size: " + questionPool.size)
            //nextQuestion()
        

        getElement("loaded-questions").textContent = questionPool.size + " Questions Loaded..."

        }).catch(error => { console.error('Error fetching questions:', error); });

}

function getRandomQuestion() {
    const keysArray = Array.from(questionPool.keys());
    const randomIndex = Math.floor(Math.random() * keysArray.length);

    currentQuestion = keysArray[randomIndex];
}

function typingEffect(char) {
    if (char >= currentQuestion.length)
        return

    questionText.innerHTML += currentQuestion.charAt(char)
    char++
    setTimeout(typingEffect, 50, char)
}

function displayQuestion() {

    questionText.textContent = ""
    typingEffect(0)

    questionCategoryText.textContent = "Category: " + questionPool.get(currentQuestion)[1]
    questionAuthorText.textContent = "Question Author: " + questionPool.get(currentQuestion)[2]

}

function nextQuestion() {
    questionPool.delete(currentQuestion)

    if (questionPool.size === 0) {
        resultText.textContent = "No more questions!"
        resultText.style.color = "black"

        console.log("Error changing questions: question pool is empty.")

        return;
    }

    getElement("submit").style.visibility = "visible"
    answerInputText.value = ""
    resultText.textContent = ""

    getRandomQuestion()
    displayQuestion()

}

function checkAnswer() {
    const userAnswer = answerInputText.value.toUpperCase()
    const acceptableAnswers = questionPool.get(currentQuestion)[0]

    const visibleAnswer = acceptableAnswers[acceptableAnswers.length - 1]

    if (acceptableAnswers.includes(userAnswer)) {
        resultText.textContent = "Correct answer!\n The answer was: " + visibleAnswer
        resultText.style.color = "green"
        numCorrect++
    }
    else {
        resultText.textContent = "Incorrect answer.\n The correct answer was: " + visibleAnswer
        resultText.style.color = "red"
        numIncorrect++
    }

    getElement("submit").style.visibility = "hidden"
    getElement("score").textContent = "Correct: " + numCorrect + " | Incorrect: " + numIncorrect

}

function clearQuestion() {
    for (let index in questionPool.keys()) {
        console.log(index)
        questionPool.delete(index);
    }

    questionText.textContent = ""

    answerInputText.value = ""
    resultText.textContent = ""
}
let i = 0;
function updateQuestionPool() {
    i++
    if (i === 3) {
        location.reload();
    }
    clearQuestion();

    if (getElement("us_history").checked) {
        parseQuestionFile('us_history.txt');
    }
    if (getElement("world_history").checked) {
        parseQuestionFile('world_history.txt');
    }
    if (getElement("art_history").checked) {
        parseQuestionFile('art_history.txt');
    }
    if (getElement("geography").checked) {
        parseQuestionFile('geography.txt');
    }
    if (getElement("mythology").checked) {
        parseQuestionFile('mythology.txt');
    }

    if (getElement("calculus").checked) {
        parseQuestionFile('calculus.txt');
    }
    if (getElement("trig").checked) {
        parseQuestionFile('trigonometry.txt');
    }
    if (getElement("algebra").checked) {
        parseQuestionFile('algebra.txt');
    }
    if (getElement("geometry").checked) {
        parseQuestionFile('geometry.txt');
    }

    if (getElement("chemistry").checked) {
        parseQuestionFile('chemistry.txt');
    }
    if (getElement("physics").checked) {
        parseQuestionFile('physics.txt');
    }
    if (getElement("biology").checked) {
        parseQuestionFile('biology.txt');
    }
    if (getElement("earthSpaceScience").checked) {
        parseQuestionFile('earth_space_science.txt');
    }

    if (getElement("englishLit").checked) {
        parseQuestionFile('english_literature.txt');
    }
    if (getElement("americanLit").checked) {
        parseQuestionFile('american_literature.txt');
    }
    if (getElement("english").checked) {
        parseQuestionFile('english.txt');
    }
    if (getElement("spanish").checked) {
        parseQuestionFile('spanish.txt');
    }
    if (getElement("french").checked) {
        parseQuestionFile('french.txt');
    }

    if (getElement("currentEvents").checked) {
        parseQuestionFile('current_events.txt');
    }

    console.log("Question Pool Size: " + questionPool.size)
    nextQuestion()

}

getElement("all").addEventListener("click", function(){

    if (this.checked) {
        getElement("us_history").checked = true;
        getElement("world_history").checked = true;
        getElement("art_history").checked = true;
        getElement("geography").checked = true;
        getElement("mythology").checked = true;

        getElement("calculus").checked = true;
        getElement("algebra").checked = true;
        getElement("geometry").checked = true;
        getElement("trig").checked = true;

        getElement("chemistry").checked = true;
        getElement("physics").checked = true;
        getElement("biology").checked = true;
        getElement("earthSpaceScience").checked = true;

        getElement("english").checked = true;
        getElement("englishLit").checked = true;
        getElement("americanLit").checked = true;
        getElement("spanish").checked = true;
        getElement("french").checked = true;

        getElement("currentEvents").checked = true;
    } else {
        getElement("us_history").checked = false;
        getElement("world_history").checked = false;
        getElement("art_history").checked = false;
        getElement("geography").checked = false;
        getElement("mythology").checked = false;

        getElement("calculus").checked = false;
        getElement("algebra").checked = false;
        getElement("geometry").checked = false;
        getElement("trig").checked = false;

        getElement("chemistry").checked = false;
        getElement("physics").checked = false;
        getElement("biology").checked = false;
        getElement("earthSpaceScience").checked = false;

        getElement("english").checked = false;
        getElement("englishLit").checked = false;
        getElement("americanLit").checked = false;
        getElement("spanish").checked = false;
        getElement("french").checked = false;

        getElement("currentEvents").checked = false;
    }

});
