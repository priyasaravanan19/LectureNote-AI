# 🎓 LectureNote AI

LectureNote AI is a smart study assistant that helps students convert lectures into organized study material. Users can record lectures using speech-to-text, enter lecture notes, generate summaries and key points, create quiz questions, and listen to summaries using text-to-speech.

## ✨ Features

- 🎤 **Speech-to-Text** — Convert spoken lectures into text.
- 📝 **Smart Lecture Notes** — Enter or paste lecture content.
- 📚 **AI-Style Summary** — Generate concise lecture summaries.
- 📌 **Key Points** — Extract important points from lectures.
- 🔑 **Keywords** — Identify important terms from the content.
- ❓ **Study Quiz** — Generate questions from lecture notes.
- 🔊 **Text-to-Speech** — Listen to generated summaries.
- 📊 **Learning Dashboard** — View notes, summaries, and quiz statistics.
- 📱 **Responsive UI** — Works on desktop, tablet, and mobile screens.

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask

### Browser APIs
- Web Speech API
- Speech Recognition API
- Speech Synthesis API

## 📂 Project Structure

```text
LectureNote-AI/
│
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── venv/
```

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/LectureNote-AI.git
```

### 2. Open the project

```bash
cd LectureNote-AI
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

#### Windows

```powershell
venv\Scripts\activate
```

#### macOS/Linux

```bash
source venv/bin/activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

## ▶️ Run the Application

Start the Flask server:

```bash
python app.py
```

Open your browser and visit:

```text
http://127.0.0.1:5000
```

## 🎤 Speech Recognition

For the best speech-to-text experience, use:

- Google Chrome
- Microsoft Edge

Allow microphone access when the browser asks for permission.

## 🔊 Text-to-Speech

LectureNote AI uses the browser's speech synthesis functionality to read generated summaries aloud.

## 🔄 Application Workflow

```text
Student
   │
   ▼
Record Lecture / Enter Notes
   │
   ▼
Speech-to-Text
   │
   ▼
Lecture Content
   │
   ▼
Process Notes
   │
   ├──► Summary
   │
   ├──► Key Points
   │
   ├──► Keywords
   │
   └──► Quiz Questions
   │
   ▼
Text-to-Speech
   │
   ▼
Smart Study Material
```

## 🎯 Use Cases

LectureNote AI can be useful for:

- College students
- School students
- Online learners
- Self-learning
- Revision preparation
- Lecture documentation
- Quick study preparation

## 🔮 Future Enhancements

- 🤖 Integration with advanced AI/LLM APIs
- 📄 PDF and DOCX upload
- ☁️ Cloud storage
- 👤 User authentication
- 💾 Database support
- 📖 Automatic flashcard generation
- 🌐 Multi-language speech recognition
- 📊 Learning progress analytics
- 🔔 Study reminders
- 🧠 Personalized learning recommendations

## 👩‍💻 Author

**Priya Saravanan**

LectureNote AI — Smart Lecture & Study Assistant.