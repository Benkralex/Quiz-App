var topicsList = [];
var teamsList = [];
var questions = [];

function addClickAnimation(button) {
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 200);
}

function generateQuiz(button) {
    addClickAnimation(button);
    
    if (checkTopics()) {
        console.log("Generating quiz...");
        console.log("Teams:", globalThis.teams);
        console.log("Questions:", globalThis.questions);
        
        button.disabled = true;
        button.textContent = 'Generating...';
        
        setTimeout(() => {
            // Use JSON encoding instead of delimiter-based approach to handle special characters
            globalThis.questions.forEach(q => {
                q.question = q.question.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
                q.answer = q.answer.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
                q.topic = q.topic.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
            });
            const questionsParam = encodeURIComponent(JSON.stringify(globalThis.questions));
            const port = window.location.port ? `:${window.location.port}` : '';
            const host = window.location.hostname;
            const url = `http://${host}${port}/game?questions=${questionsParam}`;
            
            document.getElementById('output').value = url;
            button.disabled = false;
            button.textContent = '🎯 Generate Quiz';
            
            document.getElementById('output').select();
            document.getElementById('output').setSelectionRange(0, 99999);
        }, 500);
    } else {
        alert('Please fill in all questions and answers for each topic.');
    }
}

function addTopic() {
    const button = event.target;
    addClickAnimation(button);
    
    const topicInput = document.getElementById('new-topic');
    const topic = topicInput.value.trim();
    if (topic && !topicsList.includes(topic)) {
        topicsList.push(topic);

        const questions = [];
        const answers = [];
        for (let i = 1; i <= 5; i++) {
            const pointValue = i * 100;
            questions.push(`<input type="text" id="question-${topic}-${i}" name="question-${topic}-${i}" placeholder="Question for ${pointValue} points"/>`);
            answers.push(`<input type="text" id="answer-${topic}-${i}" name="answer-${topic}-${i}" placeholder="Answer for ${pointValue} points"/>`);
        }

        const questionsWithAnswers = [0, 1, 2, 3, 4].map((i) => {
            return `<div class="question-pair">${questions[i]}${answers[i]}</div>`;
        });

        const container = document.getElementById('question-container');
        container.insertAdjacentHTML('beforeend', `
            <div class="topic" id="topic-${topic}">
                <h2>📁 ${topic}</h2>
                ${questionsWithAnswers.join('')}
                <button type="button" onclick="removeTopic('${topic}')">🗑️ Remove ${topic}</button>
            </div>`);
        topicInput.value = '';
        
        setTimeout(() => {
            document.getElementById(`question-${topic}-1`).focus();
        }, 100);
    } else if (topicsList.includes(topic)) {
        alert('This topic already exists. Please choose a different name.');
    } else {
        alert('Please enter a topic name.');
    }
}

function removeTopic(topic) {
    const index = topicsList.indexOf(topic);
    if (index !== -1) {
        topicsList.splice(index, 1);
    }
    const container = document.getElementById('question-container');
    const topicDiv = document.getElementById(`topic-${topic}`);
    if (topicDiv) {
        topicDiv.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (topicDiv.parentNode) {
                container.removeChild(topicDiv);
            }
        }, 300);
    }
}

function checkTopics() {
    globalThis.questions = [];
    for (const topic of topicsList) {
        for (let i = 1; i <= 5; i++) {
            const questionInput = document.getElementById(`question-${topic}-${i}`);
            const answerInput = document.getElementById(`answer-${topic}-${i}`);
            if (questionInput && answerInput) {
                const questionText = questionInput.value.trim();
                const answerText = answerInput.value.trim();
                if (questionText && answerText) {
                    globalThis.questions.push(new Question(
                        globalThis.questions.length + 1,
                        questionText,
                        answerText,
                        topic,
                        i
                    ));
                } else {
                    return false;
                }
            }
        }
    }
    return globalThis.questions.length >= 2;
}