from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/")
def home():
    # Vai retornar o HTML e o JS
    return jsonify({"message": "Welcome to the Flask API"})


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
