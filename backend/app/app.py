from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import re

app = Flask(__name__)
CORS(app)  # Enable cross-origin for frontend

OLLAMA_URL = "http://127.0.0.1:11434/api/generate"
MODEL_NAME = "mistral"

JAVA_KEYWORDS = [
    'java', 'jvm', 'jdk', 'jre', 'spring', 'hibernate', 'jakarta', 'javax',
    'jpa', 'jdbc', 'servlet', 'jsp', 'jsf', 'junit', 'maven', 'gradle',
    'bytecode', 'collections', 'stream', 'lambda', 'multithreading',
    'concurrency', 'synchronized', 'volatile', 'annotation', 'generics',
    'reflection', 'nio', 'serialization', 'jni', 'jframe', 'jpanel',
    'swing', 'javafx', 'j2ee', 'jee', 'jms', 'jndi', 'jta', 'jaxb',
    'jax-rs', 'jax-ws', 'gc', 'garbage collection', 'classloader',
    'hotspot', 'openjdk', 'oracle jdk', 'java se', 'java ee',
    'jakarta ee', 'microprofile', 'quarkus', 'micronaut', 'vert.x',
    'java bean', 'pojo', 'immutable', 'optional', 'functional interface',
    'predicate', 'consumer', 'supplier', 'function', 'runnable', 'callable',
    'future', 'executor', 'threadpool', 'forkjoin', 'completablefuture',
    'stream api', 'record', 'sealed class', 'pattern matching',
    'var', 'module', 'jpms', 'jlink', 'jpackage', 'jshell', 'javadoc'
]

SYSTEM_PROMPT = """
You are a highly experienced Java programming expert and assistant. Your sole purpose is to answer ONLY Java-related questions. You do NOT answer questions unrelated to Java.

You MUST provide responses that are:
1. Technically accurate
2. Systematic and well-structured
3. Easy to understand for beginners, but valuable to advanced users

You specialize in the following Java domains:
- Core Java (OOP, Collections, Exception Handling, Multithreading, etc.)
- JVM internals (memory management, garbage collection, etc.)
- JDK, JRE, and JVM differences
- Java 8 to 21 features (Streams, Lambdas, Records, Sealed Classes, etc.)
- Java frameworks (Spring Boot, Hibernate, etc.)
- Java development tools (Maven, Gradle, JUnit, etc.)
- Java performance tuning, debugging, and design patterns
- Java-related security practices

⛔ If a question is even partially outside the scope of Java (like Python, C++, Linux, general programming, or math), your response must be:

**"I specialize only in Java programming. Please ask a Java-related question."**

Your goal is to teach, assist, and explain with clarity and precision. When needed:
- Break answers into bullet points or numbered steps
- Include simple code examples in Java
- Explain why a solution works
- Provide real-world analogies when useful

Never hallucinate. Stay 100% Java-focused and professional.
"""

def is_java_related(text):
    tokens = re.findall(r'\b\w+\b', text.lower())
    return any(token in JAVA_KEYWORDS for token in tokens)

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_prompt = data.get("message", "").strip()

        if not user_prompt:
            return jsonify({"error": "No message provided"}), 400

        if not is_java_related(user_prompt):
            return jsonify({
                "response": "I specialize only in Java programming. Please ask a Java-related question."
            }), 200

        # Combine system prompt and user prompt
        final_prompt = f"{SYSTEM_PROMPT.strip()}\n\nUser: {user_prompt}"

        response = requests.post(OLLAMA_URL, json={
            "model": MODEL_NAME,
            "prompt": final_prompt,
            "stream": False
        })

        if response.status_code != 200:
            return jsonify({"error": "Ollama failed to respond"}), 500

        model_output = response.json().get("response", "")
        return jsonify({"response": model_output}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
