document.addEventListener("DOMContentLoaded", function() {
    // Wait a bit for data.js to load and parse URL parameters
    setTimeout(() => {
        // Check if questions are available
        if (window.questions && window.questions.length > 0) {
            // Questions are loaded, show team setup
            document.getElementById('team-setup').style.display = 'block';
            document.getElementById('game-view').style.display = 'none';
            console.log("Questions loaded:", window.questions.length, "questions");
        } else {
            // No questions available, show error or redirect
            alert('No questions available. Please generate a quiz first.');
            console.log("No questions found. Current questions:", window.questions);
            window.location.href = '../generate/';
        }
    }, 100);
});

function startGame() {
    console.log("startGame called");
    // Validate teams
    const greenTeam = document.getElementById('green-team').value.trim();
    const redTeam = document.getElementById('red-team').value.trim();
    const blueTeam = document.getElementById('blue-team').value.trim();
    const yellowTeam = document.getElementById('yellow-team').value.trim();
    
    // Use window instead of globalThis for better compatibility
    window.teams = [];
    if (greenTeam) window.teams.push(new Team(0, greenTeam, 'green'));
    if (redTeam) window.teams.push(new Team(1, redTeam, 'red'));
    if (blueTeam) window.teams.push(new Team(2, blueTeam, 'blue'));
    if (yellowTeam) window.teams.push(new Team(3, yellowTeam, 'yellow'));
    
    console.log("Teams created:", window.teams);
    
    if (window.teams.length >= 2) {
        window.active_team = window.teams[0].id;
        
        // Hide team setup and show game
        document.getElementById('team-setup').style.display = 'none';
        document.getElementById('game-view').style.display = 'block';
        
        // Initialize game
        generateTable();
        generateTeamList();
        
        console.log("Game started successfully");
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
    const questions = window.questions;
    var questionId = element.getAttribute("data-questionid");
    var question = questions.find(q => q.id == questionId);
    var questionActive = questions.find(q => q.state === "active" || q.state === "check");
    if (question) {
        if (question.state === "check") {
            if (event === 'r') {
                window.teams.find(t => t.id === window.active_team).score += question.dificulty * 100;
            } else if (event === 'w') {
                // Do nothing on wrong answer
            } else {
                return;
            }
            window.active_team = (window.active_team + 1) % window.teams.length;
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
    const questions = window.questions;
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
    const teams = window.teams;
    const list = document.getElementById("teams");
    teams.sort((a, b) => b.score - a.score);
    list.innerHTML = "";
    teams.forEach(t => {
        const activeIndicator = t.id == window.active_team ? '<span class="active-dot">● </span>' : '';
        list.innerHTML += `<li class="team team-${t.color} ${t.id == window.active_team ? 'team-active' : ''}">${activeIndicator}${t.name} <span class="team-score">${t.score} pts</span></li>`;
    });
}