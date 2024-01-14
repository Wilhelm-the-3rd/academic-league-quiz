const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answer");
const answerResult = document.getElementById("answerResult");
let questionPool = new Map();

var currentQuestion;
function parseFile(filePath) {

    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n').map(line => line.trim()); // Trim each line

            const resultMap = new Map();

            lines.forEach(line => {
                const regex = /^([^:]+):([^:]+):(\[.*]):([^:]+)$/;

                const match = line.match(regex);

                if (match) {
                    const category = match[1].trim();
                    const question = match[2].trim();
                    const answers = JSON.parse(match[3].trim());
                    const author = match[4].trim();

                    resultMap.set(question, [answers, category, author]);
                } else {
                    console.error(`Invalid line format: ${line}`);
                }
            });

            questionPool = resultMap;

            displayQuestion();

        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });

}

function getRandomQuestion() {
    if (questionPool.size === 0) {
        console.log('Map is empty.');
        return null;
    }

    const keysArray = Array.from(questionPool.keys());
    const randomIndex = Math.floor(Math.random() * keysArray.length);
    currentQuestion = keysArray[randomIndex];
}

function newQuestion() {

    getRandomQuestion()
    questionText.textContent = currentQuestion;
    document.getElementById("questionAuthor").textContent = "Question Author: " + questionPool.get(currentQuestion)[2];
    document.getElementById("questionCategory").textContent = "Category: " + questionPool.get(currentQuestion)[1];

}

function checkAnswer() {
    const userAnswer = answerInput.value.toUpperCase();
    const acceptableAnswers = questionPool.get(currentQuestion)[0];
    const visibleAnswer = acceptableAnswers[acceptableAnswers.length - 1]

    if (acceptableAnswers.includes(userAnswer)) {
        answerResult.textContent = "Correct answer!\n The answer was: " + visibleAnswer;
        answerResult.style.color = "green";
    } else {
        answerResult.textContent = "Incorrect answer.\n The correct answer was: " + visibleAnswer;
        answerResult.style.color = "red";
    }

    document.getElementById("submit").style.visibility = "hidden";

    questionPool.delete(currentQuestion);

    if (questionPool.size !== 0) {
        setTimeout(displayQuestion, 3500);}
    else {

        setTimeout(() => {
            answerResult.textContent = "No more questions!";
            answerResult.style.color = "black";
        }, 3500);

    }
}

function displayQuestion() {
    document.getElementById("submit").style.visibility = "visible";

    newQuestion();

    answerInput.value = "";
    answerResult.textContent = "";
}

parseFile('questions/questions.txt');