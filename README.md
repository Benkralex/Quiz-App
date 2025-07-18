![Quiz App Banner](./assets/banner.png)

# 🎯 Quiz App

A comprehensive web-based quiz application featuring both quiz generation and team-based gameplay. Perfect for educational purposes, team building, or testing knowledge across various topics.

## ✨ Features

### 🎮 Quiz Game
- **Team-Based Competition:** Support for up to 4 color-coded teams (Green, Red, Blue, Yellow)
- **Real-Time Score Tracking:** Automatically records and displays team scores during gameplay
- **Interactive Question Board:** Clean, table-based layout for easy question navigation
- **Responsive Design:** Optimized for seamless use on desktops, tablets, and mobile devices

### 🛠️ Quiz Generator
- **Custom Quiz Creation:** Build your own quizzes with custom topics and questions
- **Team Setup:** Configure team names before starting the game
- **Topic Management:** Organize questions by categories (Science, History, Sports, etc.)
- **User-Friendly Interface:** Intuitive form-based quiz creation process

### 🏗️ Technical Features
- **Dockerized Deployment:** Simple setup using Docker Compose
- **Nginx Web Server:** Fast and reliable content delivery
- **Pure HTML/CSS/JavaScript:** No framework dependencies, lightweight and fast
- **Modular Architecture:** Separate components for game logic and data management

## 🚀 Quick Start

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Benkralex/Quiz-App.git
   cd Quiz-App
   ```

2. **Start the application:**
   ```bash
   docker compose up -d
   ```

3. **Access the application:**
   - Open your web browser and navigate to `http://localhost:8081`
   - Choose between:
     - **Quiz Generator:** `http://localhost:8081/generate/` - Create custom quizzes
     - **Quiz Game:** `http://localhost:8081/game/` - Play the quiz with teams

### Stopping the Application
```bash
docker compose down
```

## 📱 Usage

### Creating a Quiz
1. Navigate to the Quiz Generator (`/generate/`)
2. Set up your team names using the color-coded inputs
3. Add topics and questions for each category
4. Generate your quiz and start playing!

### Playing the Game
1. Navigate to the Quiz Game (`/game/`)
2. Teams can select questions from the interactive board
3. Scores are automatically tracked and displayed
4. Compete to see which team knows the most!

## 🏗️ Project Structure

```
quiz/
├── assets/                 # Static assets (images, etc.)
│   └── banner.png
├── html/                   # Web application files
|   ├── favicion.png        # Web icon/logo
│   ├── data-classes.js     # Shared data models and classes
│   ├── game/               # Quiz game interface
│   │   ├── index.html      # Game page
│   │   ├── script.js       # Game logic
│   │   ├── quiz-styles.css # Game styling
│   │   └── data.js         # Game data
│   └── generate/           # Quiz generator interface
│       ├── index.html      # Generator page
│       ├── script.js       # Generator logic
│       └── styles.css      # Generator styling
├── docker-compose.yml      # Docker configuration
└── README.md              # This file
```

## 🛠️ Development

### Customization
- **Questions:** Modify `html/game/data.js` to add or change quiz questions
- **Styling:** Update CSS files to customize the appearance
- **Teams:** Adjust team configurations in the generator interface

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

If you encounter any issues or have questions:
- Create an issue on GitHub
- Check the existing documentation
- Review the project structure for understanding the codebase

---

*Happy Quizzing! 🎉*

---
###### README, style and images generated with AI