function getElement(id) { return document.getElementById(id); }
function setText(element, newText) { element.textContent = newText; }

const category = getElement("category-text")
    , question = getElement("question-text")
    , answers = getElement("answers-text")
    , difficulty = getElement("difficulty-text")
    , author = getElement("author-text");

async function copy() {
    try {
        await navigator.clipboard.writeText(getElement("output-text").textContent);
    } catch (e) {
        console.error('Failed to copy: ', e);
    }
}

function returnQuestion() {
    let answers_formatted = "[";

    answers.value.split(",").forEach((element) => answers_formatted += '"' + element.trim().toUpperCase() + '",');

    answers_formatted += "]";

    let output = category.value.trim() + ";" + question.value.trim() + ";" + answers_formatted + ";" + difficulty.value.trim() + ";" + author.value.trim();

    setText(getElement("output-text"), output);

}

getElement("category-text").addEventListener("input", returnQuestion);
getElement("question-text").addEventListener("input", returnQuestion);
getElement("answers-text").addEventListener("input", returnQuestion);
getElement("difficulty-text").addEventListener("input", returnQuestion);
getElement("author-text").addEventListener("input", returnQuestion);
