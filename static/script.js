let recognition;
let isRecording = false;

let generatedData = {
    summary: "",
    key_points: [],
    keywords: [],
    quiz: []
};


// ===============================
// SECTION NAVIGATION
// ===============================

function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active-section");
    });

    const section = document.getElementById(sectionId);

    if (section) {
        section.classList.add("active-section");
    }

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    const buttons = document.querySelectorAll(".nav-item");

    buttons.forEach(button => {

        const text = button.innerText.toLowerCase();

        if (
            (sectionId === "dashboard" && text.includes("dashboard")) ||
            (sectionId === "record" && text.includes("record")) ||
            (sectionId === "notes" && text.includes("notes")) ||
            (sectionId === "summary" && text.includes("summary")) ||
            (sectionId === "quiz" && text.includes("quiz"))
        ) {
            button.classList.add("active");
        }

    });
}


// ===============================
// SPEECH TO TEXT
// ===============================

function setupSpeechRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge."
        );

        return null;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = function() {

        isRecording = true;

        document.getElementById("recordStatus").innerText =
            "Listening...";

        document.getElementById("recordMessage").innerText =
            "Speak clearly. Your lecture is being converted to text.";

        document.getElementById("recordBtn").innerText =
            "⏹ Stop Recording";

        document.getElementById("recordBtn").classList.add("stop");

        document.getElementById("micCircle").classList.add("recording");
    };


    recognition.onresult = function(event) {

        let finalText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {

            if (event.results[i].isFinal) {
                finalText += event.results[i][0].transcript + " ";
            }

        }

        if (finalText) {

            const transcript =
                document.getElementById("transcript");

            transcript.value += finalText;

        }
    };


    recognition.onerror = function(event) {

        console.log("Speech recognition error:", event.error);

        if (event.error === "not-allowed") {

            alert(
                "Microphone permission was denied. Please allow microphone access."
            );
        }
    };


    recognition.onend = function() {

        if (isRecording) {

            try {
                recognition.start();
            } catch (error) {
                console.log(error);
            }

        }
    };

    return recognition;
}


// Initialize recognition
recognition = setupSpeechRecognition();


function toggleRecording() {

    if (!recognition) {
        recognition = setupSpeechRecognition();

        if (!recognition) {
            return;
        }
    }

    if (!isRecording) {

        try {
            recognition.start();
        } catch (error) {
            console.log(error);
        }

    } else {

        isRecording = false;

        recognition.stop();

        document.getElementById("recordStatus").innerText =
            "Recording Complete";

        document.getElementById("recordMessage").innerText =
            "Your lecture has been converted to text.";

        document.getElementById("recordBtn").innerText =
            "🎤 Start Recording";

        document.getElementById("recordBtn").classList.remove("stop");

        document.getElementById("micCircle").classList.remove("recording");
    }
}


// ===============================
// CLEAR TRANSCRIPT
// ===============================

function clearTranscript() {

    document.getElementById("transcript").value = "";

    document.getElementById("recordStatus").innerText =
        "Ready to Record";

    document.getElementById("recordMessage").innerText =
        "Click the button and start speaking.";
}


// ===============================
// USE TRANSCRIPT
// ===============================

function useTranscript() {

    const transcript =
        document.getElementById("transcript").value.trim();

    if (!transcript) {

        alert("Please record a lecture first.");

        return;
    }

    document.getElementById("notesInput").value =
        transcript;

    updateWordCount();

    showSection("notes");
}


// ===============================
// WORD COUNT
// ===============================

document
    .getElementById("notesInput")
    .addEventListener("input", updateWordCount);


function updateWordCount() {

    const text =
        document.getElementById("notesInput").value.trim();

    const words =
        text ? text.split(/\s+/).length : 0;

    document.getElementById("wordCount").innerText =
        `${words} words`;
}


// ===============================
// GENERATE NOTES
// ===============================

async function generateNotes() {

    const text =
        document.getElementById("notesInput").value.trim();

    if (!text) {

        alert("Please enter some lecture notes.");

        return;
    }

    try {

        const response = await fetch("/process", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text
            })

        });

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;
        }

        generatedData = data;

        displaySummary(data);

        displayQuiz(data);

        updateStatistics(data);

        showSection("summary");

    } catch (error) {

        console.error(error);

        alert(
            "Something went wrong while processing the lecture."
        );
    }
}


// ===============================
// DISPLAY SUMMARY
// ===============================

function displaySummary(data) {

    document.getElementById("emptySummary")
        .classList.add("hidden");

    document.getElementById("summaryContent")
        .classList.remove("hidden");


    document.getElementById("summaryText")
        .innerText = data.summary;


    const keyPoints =
        document.getElementById("keyPoints");

    keyPoints.innerHTML = "";


    data.key_points.forEach(point => {

        const li = document.createElement("li");

        li.innerText = point;

        keyPoints.appendChild(li);

    });


    const keywords =
        document.getElementById("keywords");

    keywords.innerHTML = "";


    data.keywords.forEach(word => {

        const span =
            document.createElement("span");

        span.className = "keyword";

        span.innerText = word;

        keywords.appendChild(span);

    });
}


// ===============================
// QUIZ
// ===============================

function displayQuiz(data) {

    document.getElementById("emptyQuiz")
        .classList.add("hidden");

    document.getElementById("quizContent")
        .classList.remove("hidden");


    const container =
        document.getElementById("quizContent");

    container.innerHTML = "";


    data.quiz.forEach((item, index) => {

        const card =
            document.createElement("div");

        card.className = "quiz-card";


        card.innerHTML = `
            <h3>Question ${index + 1}</h3>

            <p>${escapeHtml(item.question)}</p>

            <button
                class="show-answer"
                onclick="toggleAnswer(${index})"
            >
                Show Answer
            </button>

            <div
                class="answer"
                id="answer-${index}"
            >
                ${escapeHtml(item.answer)}
            </div>
        `;


        container.appendChild(card);

    });
}


function toggleAnswer(index) {

    const answer =
        document.getElementById(`answer-${index}`);

    if (answer.style.display === "block") {

        answer.style.display = "none";

    } else {

        answer.style.display = "block";

    }
}


// ===============================
// TEXT TO SPEECH
// ===============================

function speakText(elementId) {

    const element =
        document.getElementById(elementId);

    if (!element) {
        return;
    }

    const text =
        element.innerText;

    if (!text) {
        return;
    }

    window.speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speech.rate = 0.9;

    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}


// ===============================
// STATISTICS
// ===============================

function updateStatistics(data) {

    document.getElementById("noteCount")
        .innerText = "1";

    document.getElementById("summaryCount")
        .innerText = "1";

    document.getElementById("quizCount")
        .innerText = data.quiz.length;
}


// ===============================
// SECURITY HELPER
// ===============================

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.innerText = text;

    return div.innerHTML;
}