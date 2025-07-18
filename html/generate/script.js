var topicsList = [];
var teamsList = [];
var questions = [];

function back() {
    document.getElementById('questions').style.display='none';
    document.getElementById('teams').style.display='block';
}

function next() {
    if (checkTeams()) {
        document.getElementById('questions').style.display='block';
        document.getElementById('teams').style.display='none';
    }
}

function generateQuiz() {
    if (checkTopics()) {
        console.log("Generating quiz...");
        console.log("Teams:", globalThis.teams);
        console.log("Questions:", globalThis.questions);
        // Redirect to ../game?teams=...&questions=...
        const teamsParam = encodeURIComponent(globalThis.teams.map(t => `${t.id}:${t.name}:${t.color}`).join(','));
        const questionsParam = encodeURIComponent(globalThis.questions.map(q => `${q.id}:${q.question}:${q.answer}:${q.topic}:${q.dificulty}`).join(','));
        const port = window.location.port ? `:${window.location.port}` : '';
        const host = window.location.hostname;
        document.getElementById('output').value = `http://${host}${port}/game?teams=${teamsParam}&questions=${questionsParam}`;
        //window.location.href = `http://${host}${port}/game?teams=${teamsParam}&questions=${questionsParam}`;
    }
}

function addTopic() {
    const topicInput = document.getElementById('new-topic');
    const topic = topicInput.value.trim();
    if (topic && !topicsList.includes(topic)) {
        topicsList.push(topic);

        const questions = [];
        const answers = [];
        for (let i = 1; i <= 5; i++) {
            questions.push(`<input type="text" id="question-${topic}-${i}" name="question-${topic}-${i}" placeholder="Question ${i} for ${topic}"/><br>`);
            answers.push(`<input type="text" id="answer-${topic}-${i}" name="answer-${topic}-${i}" placeholder="Answer ${i} for ${topic}"/><br><br>`);
        }

        const questionsWithAnswers = [0, 1, 2, 3, 4].map((i) => {
            return questions[i] + answers[i];
        });

        const container = document.getElementById('question-container');
        container.insertAdjacentHTML('beforeend', `
            <div class="topic" id="topic-${topic}">
                <h2>${topic}</h2>
                ${questionsWithAnswers.join('')}
                <button type="button" onclick="removeTopic('${topic}')">Remove ${topic}</button>
            </div><br>`);
        topicInput.value = '';
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
        container.removeChild(topicDiv);
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