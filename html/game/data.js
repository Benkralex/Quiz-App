var questions = [
    /*

    // Example layout for questions

    new Question(0, "Question 1.1", "Answer 1.1", "Topic 1", 1),
    new Question(1, "Question 1.2", "Answer 1.2", "Topic 1", 2),
    new Question(2, "Question 1.3", "Answer 1.3", "Topic 1", 3),
    new Question(3, "Question 1.4", "Answer 1.4", "Topic 1", 4),
    new Question(4, "Question 1.5", "Answer 1.5", "Topic 1", 5),

    new Question(5, "Question 2.1", "Answer 2.1", "Topic 2", 1),
    new Question(6, "Question 2.2", "Answer 2.2", "Topic 2", 2),
    new Question(7, "Question 2.3", "Answer 2.3", "Topic 2", 3),
    new Question(8, "Question 2.4", "Answer 2.4", "Topic 2", 4),
    new Question(9, "Question 2.5", "Answer 2.5", "Topic 2", 5),

    new Question(10, "Question 3.1", "Answer 3.1", "Topic 3", 1),
    new Question(11, "Question 3.2", "Answer 3.2", "Topic 3", 2),
    new Question(12, "Question 3.3", "Answer 3.3", "Topic 3", 3),
    new Question(13, "Question 3.4", "Answer 3.4", "Topic 3", 4),
    new Question(14, "Question 3.5", "Answer 3.5", "Topic 3", 5),

    // Example questions for different topics

    new Question(0, "What is the capital of France?", "Paris", "Geography", 1),
    new Question(1, "Which river flows through Budapest?", "Danube", "Geography", 2),
    new Question(2, "What is the smallest country in the world?", "Vatican City", "Geography", 3),
    new Question(3, "In which country is the Atacama Desert located?", "Chile", "Geography", 4),
    new Question(4, "What is the deepest point in the ocean?", "Mariana Trench", "Geography", 5),

    new Question(5, "What is 7 + 6?", "13", "Math", 1),
    new Question(6, "What is the square root of 144?", "12", "Math", 2),
    new Question(7, "What is the derivative of x²?", "2x", "Math", 3),
    new Question(8, "What is the integral of 1/x?", "ln|x| + C", "Math", 4),
    new Question(9, "What is the determinant of a 3x3 identity matrix?", "1", "Math", 5),

    new Question(10, "Who wrote 'Romeo and Juliet'?", "William Shakespeare", "Literature", 1),
    new Question(11, "What is the main character's name in '1984'?", "Winston Smith", "Literature", 2),
    new Question(12, "Who wrote 'The Picture of Dorian Gray'?", "Oscar Wilde", "Literature", 3),
    new Question(13, "In which novel does Captain Ahab appear?", "Moby-Dick", "Literature", 4),
    new Question(14, "What is the first line of 'Pride and Prejudice'?", "It is a truth universally acknowledged...", "Literature", 5),

    new Question(15, "What does CPU stand for?", "Central Processing Unit", "Technology", 1),
    new Question(16, "What does HTTP stand for?", "HyperText Transfer Protocol", "Technology", 2),
    new Question(17, "What is the time complexity of binary search?", "O(log n)", "Technology", 3),
    new Question(18, "What is Moore's Law?", "The number of transistors doubles every ~2 years", "Technology", 4),
    new Question(19, "What is quantum entanglement used for in computing?", "Quantum communication and cryptography", "Technology", 5),
    */
]

// Teams will be set up in the game UI
var teams = [];

// Parse URL parameters for questions only
function getParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Parse questions from URL
const questionsParam = getParam('questions');
if (questionsParam) {
    try {
        const parsedQuestions = JSON.parse(decodeURIComponent(questionsParam));
        questions.length = 0;
        parsedQuestions.forEach(q => {
            const question = new Question(q.id, q.question, q.answer, q.topic, q.dificulty);
            // Preserve the state if it exists in the JSON
            if (q.state !== undefined) {
                question.state = q.state;
            }
            questions.push(question);
        });
        console.log("Successfully parsed questions from JSON:", questions);
    } catch (e) {
        console.error("Failed to parse questions JSON:", e);
    }
}

// Active team will be set when game starts
var active_team = 0;

console.log("Questions loaded:", questions.length);
console.log("Questions:", questions);