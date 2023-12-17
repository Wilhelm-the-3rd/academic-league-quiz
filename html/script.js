const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answer");
const answerResult = document.getElementById("answerResult");
let questionsAndAnswers = [];

function fetchQuestions() {
    fetch('questions.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n').map(line => line.trim()); // Trim each line
            for (let i = 0; i < lines.length; i += 2) {
                if (lines[i] && lines[i + 1]) { // Ensure both question and answer exist
                    questionsAndAnswers.push({
                        question: lines[i],
                        answer: lines[i + 1].toLowerCase()
                    });
                }
            }
            shuffleQuestions();
            displayQuestion();
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });
}

function shuffleQuestions() {
    // Fisher-Yates shuffle algorithm for randomizing questions
    for (let i = questionsAndAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionsAndAnswers[i], questionsAndAnswers[j]] = [questionsAndAnswers[j], questionsAndAnswers[i]];
    }
}

function checkAnswer() {
    const userAnswer = answerInput.value.toLowerCase();
    const currentQuestion = questionsAndAnswers[0];
    const correctAnswer = currentQuestion.answer;

    if (userAnswer.includes(correctAnswer)) {
        answerResult.textContent = "Correct answer!\n The answer was: " + correctAnswer;
        answerResult.style.color = "green";
    } else {
        answerResult.textContent = "Incorrect answer.\n The correct answer was: " + correctAnswer;
        answerResult.style.color = "red";
    }

    document.getElementById("submit").style.visibility = "hidden";

    questionsAndAnswers.shift(); // Remove the answered question

    if (questionsAndAnswers.length > 0) {
        setTimeout(displayQuestion, 3500)
    } else {
        answerResult.textContent = "No more questions!";
        answerResult.style.color = "black";
    }
}

function displayQuestion() {
    document.getElementById("submit").style.visibility = "visible";

    if (questionsAndAnswers.length > 0) {
        const currentQuestion = questionsAndAnswers[0].question;
        questionText.textContent = currentQuestion;

        answerInput.value = ""; // Clear the input field for the next question
        answerResult.textContent = ""; // Clear previous answer result
    }
}

fetchQuestions();
