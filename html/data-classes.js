class Question {
    constructor(id, question, answer, topic, dificulty) {
        this.id = id;
        this.question = question; // e.g., "What is the capital of France?"
        this.answer = answer; // e.g., "Paris", "4", "Jupiter"
        this.topic = topic; // e.g., "Geography", "Math", "Science"
        this.dificulty = dificulty; // 1-5 scale
        this.state = "idle"; // "idle", "active", "used"
    }
}

class Team {
    constructor(id, name, color) {
        this.id = id;
        this.name = name; // e.g., "Team A"
        this.color = color; // e.g., "red", "blue"
        this.score = 0; // Initial score
    }
}