var topicsList = [];
var teamsList = [];
var questions = [];

function addClickAnimation(button) {
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 200);
}

function back() {
    const button = event.target;
    addClickAnimation(button);
    
    document.getElementById('questions').style.display='none';
    document.getElementById('teams').style.display='block';
}

function next() {
    const button = event.target;
    addClickAnimation(button);
    
    if (checkTeams()) {
        document.getElementById('questions').style.display='block';
        document.getElementById('teams').style.display='none';
        setTimeout(() => {
            document.getElementById('new-topic').focus();
        }, 100);
    } else {
        alert('Please enter at least 2 team names to continue.');
    }
}

function generateQuiz() {
    const button = event.target;
    addClickAnimation(button);
    
    if (checkTopics()) {
        console.log("Generating quiz...");
        console.log("Teams:", globalThis.teams);
        console.log("Questions:", globalThis.questions);
        
        button.disabled = true;
        button.textContent = 'Generating...';
        
        setTimeout(() => {
            const teamsParam = encodeURIComponent(globalThis.teams.map(t => `${t.id}:${t.name}:${t.color}`).join(','));
            const questionsParam = encodeURIComponent(globalThis.questions.map(q => `${q.id}:${q.question}:${q.answer}:${q.topic}:${q.dificulty}`).join(','));
            const port = window.location.port ? `:${window.location.port}` : '';
            const host = window.location.hostname;
            const url = `http://${host}${port}/game?teams=${teamsParam}&questions=${questionsParam}`;
            
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

function checkTeams() {
    const greenTeam = document.getElementById('green-team').value.trim();
    const redTeam = document.getElementById('red-team').value.trim();
    const blueTeam = document.getElementById('blue-team').value.trim();
    const yellowTeam = document.getElementById('yellow-team').value.trim();
    globalThis.teams = [];
    if (greenTeam) globalThis.teams.push(new Team(0, greenTeam, 'green'));
    if (redTeam) globalThis.teams.push(new Team(1, redTeam, 'red'));
    if (blueTeam) globalThis.teams.push(new Team(2, blueTeam, 'blue'));
    if (yellowTeam) globalThis.teams.push(new Team(3, yellowTeam, 'yellow'));
    return globalThis.teams.length >= 2;
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