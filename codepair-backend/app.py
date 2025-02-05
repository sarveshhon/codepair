from flask import Flask, request, jsonify
import ollama

app = Flask(__name__)

@app.route('/search', methods=['POST'])
def generate_response():
    # Get the input prompt from the request
    data = request.json
    prompt = data.get('prompt', '')

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        # Use Ollama to generate response from DeepSeek model
        response = ollama.chat(
            model="deepseek-coder:6.7b",
            messages=[{'role': 'user', 'content': prompt}]
        )

        # Extract the response content
        generated_text = response['message']['content']

        return jsonify({
            "prompt": prompt,
            "response": generated_text
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
