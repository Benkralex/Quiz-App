document.addEventListener("DOMContentLoaded", function() {
    // Check if questions are available
    if (globalThis.questions && globalThis.questions.length > 0) {
        // Questions are loaded, show team setup
        document.getElementById('team-setup').style.display = 'block';
        document.getElementById('game-view').style.display = 'none';
    } else {
        // No questions available, show error or redirect
        alert('No questions available. Please generate a quiz first.');
        window.location.href = '../generate/';
    }
});

function startGame() {
    // Validate teams
    const greenTeam = document.getElementById('green-team').value.trim();
    const redTeam = document.getElementById('red-team').value.trim();
    const blueTeam = document.getElementById('blue-team').value.trim();
    const yellowTeam = document.getElementById('yellow-team').value.trim();
    
    globalThis.teams = [];
    if (greenTeam) globalThis.teams.push(new Team(0, greenTeam, 'green'));
    if (redTeam) globalThis.teams.push(new Team(1, redTeam, 'red'));
    if (blueTeam) globalThis.teams.push(new Team(2, blueTeam, 'blue'));
    if (yellowTeam) globalThis.teams.push(new Team(3, yellowTeam, 'yellow'));
    
    if (globalThis.teams.length >= 2) {
        globalThis.active_team = globalThis.teams[0].id;
        
        // Hide team setup and show game
        document.getElementById('team-setup').style.display = 'none';
        document.getElementById('game-view').style.display = 'block';
        
        // Initialize game
        generateTable();
        generateTeamList();
    } else {
        alert('Please enter at least 2 team names to start the game.');
    }
}

// Allow Enter key to start the game
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && document.getElementById('team-setup').style.display !== 'none') {
        startGame();
    }
});

function questionClick(element, event) {
    const questions = globalThis.questions;
    var questionId = element.getAttribute("data-questionid");
    var question = questions.find(q => q.id == questionId);
    var questionActive = questions.find(q => q.state === "active" || q.state === "check");
    if (question) {
        if (question.state === "check") {
            if (event === 'r') {
                globalThis.teams.find(t => t.id === globalThis.active_team).score += question.dificulty * 100;
            } else if (event === 'w') {
                // Do nothing on wrong answer
            } else {
                return;
            }
            globalThis.active_team = (globalThis.active_team + 1) % globalThis.teams.length;
            question.state = "used";
        } else if (question.state === "active") {
            question.state = "check";
        } else if (question.state === "idle" && !questionActive) {
            question.state = "active";
        }
        generateTable();
        generateTeamList();
    }
}

function questionElement(question) {
    var content = ``;
    if (question.state === "idle") {
        content = `<span class="points-span">${question.dificulty * 100}</span>`;
    } else if (question.state === "active") {
        content = `<span class="question-span">${question.question}</span>`;
    } else if (question.state === "used") {
        content = `
            <span class="question-span">${question.question}</span><br>
            <span class="answer-span">${question.answer}</span>
        `;
    } else if (question.state === "check") {
        content = `
            <span class="question-span">${question.question}</span><br>
            <span class="answer-span">${question.answer}</span><br>
            <button class="check-button check-button-right" onclick="questionClick(this.parentElement, 'r')">&check;</button>
            <button class="check-button check-button-wrong" onclick="questionClick(this.parentElement, 'w')">&cross;</button>`;
    }
    return `<td class="${question.state} question-card card" data-questionid="${question.id}"onclick="questionClick(this)">
                ${content}
            </td>`;
}

function generateTable() {
    const questions = globalThis.questions;
    const table = document.getElementById("question_table");
    topics = [...new Set(questions.map(q => q.topic))];
    topics.sort();
    topicsRow = `<tr>${topics.map(topic => `<td class="card topic-card">${topic}</td>`).join('')}</tr>`;
    rows = [];
    for (var i = 1; i <= 5; i++) {
        q = questions.filter(q => q.dificulty === i);
        q.sort((a, b) => topics.indexOf(a.topic) - topics.indexOf(b.topic));
        if (q.length > 0) {
            rows.push(`<tr>${q.map(questionElement).join('')}</tr>`);
        } else {
            rows.push(`<tr>${topics.map(() => '<td></td>').join('')}</tr>`);
        }
    }
    table.innerHTML = topicsRow + rows.join('');
}

function generateTeamList() {
    const teams = globalThis.teams;
    const list = document.getElementById("teams");
    teams.sort((a, b) => b.score - a.score);
    list.innerHTML = "";
    teams.forEach(t => {
        const activeIndicator = t.id == active_team ? '<span class="active-dot">● </span>' : '';
        list.innerHTML += `<li class="team team-${t.color} ${t.id == active_team ? 'team-active' : ''}">${activeIndicator}${t.name} <span class="team-score">${t.score} pts</span></li>`;
    });
}