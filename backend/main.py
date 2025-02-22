from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__)


@app.route("/", methods=["GET"])
def home():
    return send_from_directory("frontend/dist", "index.html")


@app.route("/publicacao", methods=["POST"])
def send_to_facebook():
    data = request.get_json()
    x = {
        "titulo": "titulo da pub",
        "texto": "texto da pub",
        "utilizadores": "utilizadores da pub",
        "timestamp": "timestamp da pub",
    }
    return jsonify({"you_sent": data})


if __name__ == "__main__":
    app.run(debug=True)