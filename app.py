from flask import Flask, render_template, request, jsonify

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static",
    static_url_path="/static"
)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/process", methods=["POST"])
def process_notes():

    data = request.get_json()
    text = data.get("text", "").strip()

    if not text:
        return jsonify({
            "success": False,
            "message": "Please enter some lecture notes."
        })

    sentences = [
        s.strip()
        for s in text.replace("!", ".").replace("?", ".").split(".")
        if s.strip()
    ]

    summary = ". ".join(sentences[:3])

    if summary:
        summary += "."

    key_points = sentences[:6]

    stop_words = {
        "the", "is", "a", "an", "and", "or",
        "of", "to", "in", "on", "for", "with",
        "this", "that", "are", "was", "were",
        "it", "as", "by", "from", "be",
        "has", "have", "had", "will", "can"
    }

    words = text.lower().split()

    keywords = []

    for word in words:

        word = word.strip(".,!?;:()[]{}")

        if (
            len(word) > 4
            and word not in stop_words
            and word not in keywords
        ):
            keywords.append(word)

    keywords = keywords[:8]

    quiz = []

    for point in sentences[:3]:

        quiz.append({
            "question": f"What is the main idea of: '{point}'?",
            "answer": point
        })

    return jsonify({
        "success": True,
        "summary": summary,
        "key_points": key_points,
        "keywords": keywords,
        "quiz": quiz
    })


if __name__ == "__main__":
    app.run(debug=True)