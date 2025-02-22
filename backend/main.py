from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")


@app.route("/", methods=["GET"])
def home():
    return send_from_directory("./dist", "index.html")


@app.route("/assets/<file>", methods=["GET"])
def react(file):
    return send_from_directory("./dist/assets", file)


@app.route("/publicacoes", methods=["POST"])
def send_to_facebook():
    data = request.get_json()
    x = {
        "titulo": "titulo da pub",
        "texto": "texto da pub",
        "utilizador": "utilizadores da pub",
        "timestamp": "timestamp da pub",
    }
    print(data)
    return jsonify({"you_sent": data})


if __name__ == "__main__":
    app.run(debug=True)
