# # # # # import os
# # # # # from flask import Flask, request, jsonify, send_file
# # # # # import whisper
# # # # # from gtts import gTTS
# # # # # import uuid

# # # # # app = Flask(__name__)

# # # # # # Load Whisper model once
# # # # # model = whisper.load_model("base")
# # # # # os.environ["PATH"] += os.pathsep + r"C:\ffmpeg\bin"  # For Windows ffmpeg path

# # # # # # ---------- AUDIO TO TEXT ----------
# # # # # @app.route("/att", methods=["POST"])
# # # # # def audio_to_text():
# # # # #     if "file" not in request.files:
# # # # #         return jsonify({"error": "No file uploaded"}), 400

# # # # #     audio_file = request.files["file"]
# # # # #     file_path = os.path.join("uploads", audio_file.filename)
# # # # #     os.makedirs("uploads", exist_ok=True)
# # # # #     audio_file.save(file_path)

# # # # #     try:
# # # # #         result = model.transcribe(file_path)
# # # # #         return jsonify({"text": result["text"]})
# # # # #     except Exception as e:
# # # # #         return jsonify({"error": str(e)}), 500


# # # # # # ---------- TEXT TO SPEECH ----------
# # # # # @app.route("/tts", methods=["POST"])
# # # # # def text_to_speech():
# # # # #     data = request.get_json()
# # # # #     if not data or "text" not in data:
# # # # #         return jsonify({"error": "No text provided"}), 400

# # # # #     text = data["text"]
# # # # #     filename = f"{uuid.uuid4()}.mp3"
# # # # #     filepath = os.path.join("uploads", filename)
# # # # #     os.makedirs("uploads", exist_ok=True)

# # # # #     try:
# # # # #         tts = gTTS(text=text, lang="en")
# # # # #         tts.save(filepath)
# # # # #         return send_file(filepath, mimetype="audio/mpeg", as_attachment=True)
# # # # #     except Exception as e:
# # # # #         return jsonify({"error": str(e)}), 500


# # # # # if __name__ == "__main__":
# # # # #     app.run(host="0.0.0.0", port=5000, debug=True)
# # # # # import os
# # # # # from flask import Flask, request, jsonify, send_file
# # # # # import whisper
# # # # # from gtts import gTTS
# # # # # import uuid

# # # # # app = Flask(__name__)

# # # # # model = whisper.load_model("base")
# # # # # os.makedirs("uploads", exist_ok=True)

# # # # # @app.route("/att", methods=["POST"])
# # # # # def audio_to_text():
# # # # #     if "file" not in request.files:
# # # # #         return jsonify({"error": "No file uploaded"}), 400

# # # # #     audio_file = request.files["file"]
# # # # #     file_path = os.path.join("uploads", audio_file.filename)
# # # # #     audio_file.save(file_path)

# # # # #     try:
# # # # #         result = model.transcribe(file_path)
# # # # #         return jsonify({"text": result["text"]})
# # # # #     except Exception as e:
# # # # #         return jsonify({"error": str(e)}), 500

# # # # # @app.route("/tts", methods=["POST"])
# # # # # def text_to_speech():
# # # # #     data = request.get_json()
# # # # #     if not data or "text" not in data:
# # # # #         return jsonify({"error": "No text provided"}), 400

# # # # #     text = data["text"]
# # # # #     filename = f"{uuid.uuid4()}.mp3"
# # # # #     filepath = os.path.join("uploads", filename)

# # # # #     try:
# # # # #         tts = gTTS(text=text, lang="en")
# # # # #         tts.save(filepath)
# # # # #         return send_file(filepath, mimetype="audio/mpeg", as_attachment=True)
# # # # #     except Exception as e:
# # # # #         return jsonify({"error": str(e)}), 500

# # # # # if __name__ == "__main__":
# # # # #     app.run(port=5000, debug=True)
# # # # import os
# # # # import uuid
# # # # from flask import Flask, request, jsonify, send_file
# # # # import whisper
# # # # from gtts import gTTS

# # # # app = Flask(__name__)

# # # # # Load Whisper model once at startup
# # # # model = whisper.load_model("base")

# # # # # Ensure uploads folder exists
# # # # UPLOAD_FOLDER = "uploads"
# # # # os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # # # @app.route("/")
# # # # def home():
# # # #     return "✅ Voice Service API is running! Use /att for speech-to-text or /tts for text-to-speech."

# # # # # 🎤 Audio to Text (Speech-to-Text)
# # # # @app.route("/att", methods=["POST"])
# # # # def audio_to_text():
# # # #     if "file" not in request.files:
# # # #         return jsonify({"error": "No file uploaded"}), 400

# # # #     audio_file = request.files["file"]
# # # #     # Ensure unique filename to avoid overwrites
# # # #     filename = f"{uuid.uuid4()}_{audio_file.filename}"
# # # #     file_path = os.path.join(UPLOAD_FOLDER, filename)
# # # #     audio_file.save(file_path)

# # # #     try:
# # # #         result = model.transcribe(file_path)
# # # #         return jsonify({"text": result["text"]})
# # # #     except Exception as e:
# # # #         return jsonify({"error": str(e)}), 500
# # # #     finally:
# # # #         # Optional: delete uploaded file after processing to save space
# # # #         if os.path.exists(file_path):
# # # #             os.remove(file_path)

# # # # # 🗣️ Text to Speech (TTS)
# # # # @app.route("/tts", methods=["POST"])
# # # # def text_to_speech():
# # # #     data = request.get_json()
# # # #     if not data or "text" not in data:
# # # #         return jsonify({"error": "No text provided"}), 400

# # # #     text = data["text"]
# # # #     filename = f"{uuid.uuid4()}.mp3"
# # # #     filepath = os.path.join(UPLOAD_FOLDER, filename)

# # # #     try:
# # # #         tts = gTTS(text=text, lang="en")
# # # #         tts.save(filepath)
# # # #         return send_file(filepath, mimetype="audio/mpeg", as_attachment=True, download_name=filename)
# # # #     except Exception as e:
# # # #         return jsonify({"error": str(e)}), 500

# # # # if __name__ == "__main__":
# # # #     app.run(port=5000, debug=True)


# # # from flask import Flask, request, jsonify, send_file
# # # from flask_cors import CORS
# # # import speech_recognition as sr
# # # from gtts import gTTS
# # # import os
# # # import uuid

# # # app = Flask(__name__)
# # # CORS(app)  # Allow requests from React

# # # # 📌 Endpoint: Audio → Text
# # # @app.route('/att', methods=['POST'])
# # # def audio_to_text():
# # #     try:
# # #         if "file" not in request.files:
# # #             return jsonify({"error": "No file uploaded"}), 400

# # #         file = request.files["file"]

# # #         recognizer = sr.Recognizer()
# # #         with sr.AudioFile(file) as source:
# # #             audio_data = recognizer.record(source)
# # #             text = recognizer.recognize_google(audio_data)

# # #         return jsonify({"text": text})
# # #     except Exception as e:
# # #         return jsonify({"error": str(e)}), 500


# # # # 📌 Endpoint: Text → Audio
# # # @app.route('/tts', methods=['POST'])
# # # def text_to_audio():
# # #     try:
# # #         data = request.get_json()
# # #         text = data.get("text")

# # #         if not text:
# # #             return jsonify({"error": "No text provided"}), 400

# # #         # Save audio file with random name
# # #         filename = f"output_{uuid.uuid4().hex}.mp3"
# # #         tts = gTTS(text=text, lang="en")
# # #         tts.save(filename)

# # #         return send_file(filename, mimetype="audio/mpeg", as_attachment=False)
# # #     except Exception as e:
# # #         return jsonify({"error": str(e)}), 500


# # # if __name__ == '__main__':
# # #     app.run(host="0.0.0.0", port=5000, debug=True)


# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # import speech_recognition as sr
# # from gtts import gTTS
# # import os

# # app = Flask(__name__)
# # CORS(app)  # ✅ allow requests from React

# # # 🎤 AUDIO TO TEXT
# # @app.route('/audio-to-text', methods=['POST'])
# # def audio_to_text():
# #     if 'file' not in request.files:
# #         return jsonify({"error": "No file uploaded"}), 400

# #     file = request.files['file']
# #     recognizer = sr.Recognizer()
# #     with sr.AudioFile(file) as source:
# #         audio = recognizer.record(source)

# #     try:
# #         text = recognizer.recognize_google(audio)
# #         return jsonify({"text": text})
# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500


# # # ✍️ TEXT TO AUDIO
# # @app.route('/text-to-audio', methods=['POST'])
# # def text_to_audio():
# #     data = request.json
# #     if not data or 'text' not in data:
# #         return jsonify({"error": "No text provided"}), 400

# #     text = data['text']
# #     tts = gTTS(text)
# #     filename = "output.mp3"
# #     filepath = os.path.join("static", filename)
# #     os.makedirs("static", exist_ok=True)
# #     tts.save(filepath)

# #     return jsonify({"audio_url": f"http://localhost:5000/{filepath}"})


# # if __name__ == '__main__':
# #     app.run(debug=True, port=5000)

# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# import speech_recognition as sr
# import pyttsx3
# import os
# from werkzeug.utils import secure_filename

# app = Flask(__name__)
# CORS(app)  # Allow frontend to connect

# UPLOAD_FOLDER = "uploads"
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)


# # ---- AUDIO TO TEXT ----
# @app.route("/api/audio-to-text", methods=["POST"])
# def audio_to_text():
#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files["file"]
#     filename = secure_filename(file.filename)
#     filepath = os.path.join(UPLOAD_FOLDER, filename)
#     file.save(filepath)

#     recognizer = sr.Recognizer()
#     with sr.AudioFile(filepath) as source:
#         audio = recognizer.record(source)

#     try:
#         text = recognizer.recognize_google(audio)
#     except sr.UnknownValueError:
#         text = "Could not understand audio."
#     except sr.RequestError:
#         text = "Speech recognition service unavailable."

#     return jsonify({"text": text})


# # ---- TEXT TO AUDIO ----
# @app.route("/api/text-to-audio", methods=["POST"])
# def text_to_audio():
#     data = request.json
#     text = data.get("text", "")

#     if not text:
#         return jsonify({"error": "No text provided"}), 400

#     filepath = os.path.join(UPLOAD_FOLDER, "output_audio.wav")

#     engine = pyttsx3.init()
#     engine.save_to_file(text, filepath)
#     engine.runAndWait()

#     return send_file(filepath, mimetype="audio/wav", as_attachment=True, download_name="output.wav")


# if __name__ == "__main__":
#     app.run(host="127.0.0.1", port=5000, debug=True)

# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# import speech_recognition as sr
# import pyttsx3
# import os
# import uuid

# app = Flask(__name__)
# CORS(app)

# # 🎤 Audio to Text
# @app.route('/audio-to-text', methods=['POST'])
# def audio_to_text():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']
#     filename = f"temp_{uuid.uuid4()}.wav"
#     file.save(filename)

#     recognizer = sr.Recognizer()
#     with sr.AudioFile(filename) as source:
#         audio = recognizer.record(source)

#     try:
#         text = recognizer.recognize_google(audio)
#     except sr.UnknownValueError:
#         text = "Sorry, could not recognize the audio."
#     except sr.RequestError:
#         text = "Speech recognition service error."

#     os.remove(filename)
#     return jsonify({"text": text})


# # 📢 Text to Audio
# @app.route('/text-to-audio', methods=['POST'])
# def text_to_audio():
#     data = request.get_json()
#     text = data.get("text", "")

#     if not text.strip():
#         return jsonify({"error": "No text provided"}), 400

#     filename = f"output_{uuid.uuid4()}.wav"

#     # Using pyttsx3
#     engine = pyttsx3.init()
#     engine.save_to_file(text, filename)
#     engine.runAndWait()

#     return send_file(filename, as_attachment=True, mimetype="audio/wav")


# if __name__ == '__main__':
#     app.run(debug=True)

# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# import speech_recognition as sr
# import pyttsx3
# import tempfile
# import os

# app = Flask(__name__)
# CORS(app)  # ✅ Allow frontend React (port 3000) to call Flask (port 5000)


# @app.route("/audio-to-text", methods=["POST"])
# def audio_to_text():
#     try:
#         if "file" not in request.files:
#             return jsonify({"error": "No file uploaded"}), 400

#         file = request.files["file"]

#         recognizer = sr.Recognizer()
#         with sr.AudioFile(file) as source:
#             audio_data = recognizer.record(source)
#             text = recognizer.recognize_google(audio_data)

#         return jsonify({"text": text})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# @app.route("/text-to-audio", methods=["POST"])
# def text_to_audio():
#     try:
#         data = request.get_json()
#         text = data.get("text", "")

#         if not text.strip():
#             return jsonify({"error": "No text provided"}), 400

#         engine = pyttsx3.init()
#         temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
#         engine.save_to_file(text, temp_file.name)
#         engine.runAndWait()

#         return send_file(temp_file.name, mimetype="audio/mpeg")

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(debug=True, port=5000)

# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# import speech_recognition as sr
# import pyttsx3
# import os
# from gtts import gTTS

# app = Flask(__name__)
# CORS(app)

# UPLOAD_FOLDER = "uploads"
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)

# # 🎙️ Audio to Text API
# @app.route("/api/audio-to-text", methods=["POST"])
# def audio_to_text():
#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files["file"]
#     filepath = os.path.join(UPLOAD_FOLDER, file.filename)
#     file.save(filepath)

#     recognizer = sr.Recognizer()
#     with sr.AudioFile(filepath) as source:
#         audio_data = recognizer.record(source)
#         try:
#             text = recognizer.recognize_google(audio_data)
#             return jsonify({"text": text})
#         except sr.UnknownValueError:
#             return jsonify({"error": "Could not understand audio"}), 400

# # 📝 Text to Audio API
# @app.route("/api/text-to-audio", methods=["POST"])
# def text_to_audio():
#     data = request.get_json()
#     if not data or "text" not in data:
#         return jsonify({"error": "No text provided"}), 400

#     text = data["text"]
#     tts = gTTS(text=text, lang="en")
#     filepath = os.path.join(UPLOAD_FOLDER, "output.mp3")
#     tts.save(filepath)

#     return send_file(filepath, mimetype="audio/mpeg", as_attachment=False)

# if __name__ == "__main__":
#     app.run(debug=True)


# from flask import Flask, request, jsonify, send_file
# import speech_recognition as sr
# from gtts import gTTS
# import os
# import uuid
# from transformers import pipeline
# from googletrans import Translator
# from docx import Document

# app = Flask(__name__)

# UPLOAD_FOLDER = "uploads"
# OUTPUT_FOLDER = "outputs"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# # Load AI Models
# summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
# sentiment = pipeline("sentiment-analysis")
# translator = Translator()

# # ✅ 1. Speech to Text
# @app.route("/stt", methods=["POST"])
# def speech_to_text():
#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files["file"]
#     filename = os.path.join(UPLOAD_FOLDER, file.filename)
#     file.save(filename)

#     r = sr.Recognizer()
#     with sr.AudioFile(filename) as source:
#         audio = r.record(source)

#     try:
#         text = r.recognize_google(audio)
#         return jsonify({"text": text})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # ✅ 2. Text to Speech
# @app.route("/tts", methods=["POST"])
# def text_to_speech():
#     data = request.json
#     text = data.get("text", "")
#     lang = data.get("lang", "en")

#     filename = os.path.join(OUTPUT_FOLDER, f"{uuid.uuid4()}.mp3")
#     tts = gTTS(text=text, lang=lang)
#     tts.save(filename)

#     return send_file(filename, as_attachment=True)


# # ✅ 3. Summarization
# @app.route("/summarize", methods=["POST"])
# def summarize_text():
#     data = request.json
#     text = data.get("text", "")
#     summary = summarizer(text, max_length=100, min_length=30, do_sample=False)
#     return jsonify({"summary": summary[0]["summary_text"]})


# # ✅ 4. Sentiment Analysis
# @app.route("/sentiment", methods=["POST"])
# def analyze_sentiment():
#     data = request.json
#     text = data.get("text", "")
#     result = sentiment(text)
#     return jsonify(result[0])


# # ✅ 5. Translation
# @app.route("/translate", methods=["POST"])
# def translate_text():
#     data = request.json
#     text = data.get("text", "")
#     dest = data.get("dest", "en")
#     translated = translator.translate(text, dest=dest)
#     return jsonify({"translated_text": translated.text})


# # ✅ 6. Download as DOCX
# @app.route("/download_docx", methods=["POST"])
# def download_docx():
#     data = request.json
#     text = data.get("text", "")

#     doc = Document()
#     doc.add_heading("Converted Text", 0)
#     doc.add_paragraph(text)

#     filename = os.path.join(OUTPUT_FOLDER, f"{uuid.uuid4()}.docx")
#     doc.save(filename)

#     return send_file(filename, as_attachment=True)


# if __name__ == "__main__":
#     app.run(debug=True)

# import os
# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# from transformers import pipeline
# import tempfile
# from gtts import gTTS
# import speech_recognition as sr
# from docx import Document

# # ---------------------------
# # Flask setup
# # ---------------------------
# app = Flask(__name__)
# CORS(app)

# # ---------------------------
# # Load AI Models
# # ---------------------------
# print("⏳ Loading summarizer model...")
# summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")  # Faster model
# print("✅ Summarizer loaded!")


# # ---------------------------
# # Routes
# # ---------------------------

# @app.route("/")
# def home():
#     return jsonify({"message": "VoiceSnap Flask backend is running 🚀"})


# # 1️⃣ Summarize text
# @app.route("/summarize", methods=["POST"])
# def summarize_text():
#     try:
#         data = request.json
#         text = data.get("text", "")
#         if not text:
#             return jsonify({"error": "No text provided"}), 400

#         summary = summarizer(text, max_length=120, min_length=30, do_sample=False)
#         return jsonify({"summary": summary[0]['summary_text']})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # 2️⃣ Text-to-Speech (TTS)
# @app.route("/text-to-speech", methods=["POST"])
# def text_to_speech():
#     try:
#         data = request.json
#         text = data.get("text", "")
#         if not text:
#             return jsonify({"error": "No text provided"}), 400

#         tts = gTTS(text)
#         temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
#         tts.save(temp_file.name)
#         return send_file(temp_file.name, as_attachment=True, download_name="output.mp3")

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # 3️⃣ Speech-to-Text (STT)
# @app.route("/speech-to-text", methods=["POST"])
# def speech_to_text():
#     try:
#         if "file" not in request.files:
#             return jsonify({"error": "No audio file uploaded"}), 400

#         file = request.files["file"]
#         temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
#         file.save(temp_file.name)

#         recognizer = sr.Recognizer()
#         with sr.AudioFile(temp_file.name) as source:
#             audio = recognizer.record(source)

#         text = recognizer.recognize_google(audio)
#         return jsonify({"text": text})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # 4️⃣ Export summary to DOCX
# @app.route("/export-docx", methods=["POST"])
# def export_docx():
#     try:
#         data = request.json
#         summary_text = data.get("summary", "")
#         if not summary_text:
#             return jsonify({"error": "No summary provided"}), 400

#         doc = Document()
#         doc.add_heading("VoiceSnap Summary", 0)
#         doc.add_paragraph(summary_text)

#         temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".docx")
#         doc.save(temp_file.name)

#         return send_file(temp_file.name, as_attachment=True, download_name="summary.docx")

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # ---------------------------
# # Run Server
# # ---------------------------
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)


# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# import os
# from gtts import gTTS
# import speech_recognition as sr
# from textblob import TextBlob
# from googletrans import Translator
# from sumy.parsers.plaintext import PlaintextParser
# from sumy.nlp.tokenizers import Tokenizer
# from sumy.summarizers.lsa import LsaSummarizer
# from docx import Document

# app = Flask(__name__)
# CORS(app)

# UPLOAD_FOLDER = "uploads"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # ------------------ SUMMARIZER ------------------
# def simple_summarize(text, sentences_count=3):
#     parser = PlaintextParser.from_string(text, Tokenizer("english"))
#     summarizer = LsaSummarizer()
#     summary = summarizer(parser.document, sentences_count)
#     return " ".join([str(sentence) for sentence in summary])

# @app.route("/summarize", methods=["POST"])
# def summarize_text():
#     try:
#         data = request.json
#         text = data.get("text", "")
#         if not text.strip():
#             return jsonify({"error": "No text provided"}), 400
#         summary = simple_summarize(text, sentences_count=3)
#         return jsonify({"summary": summary})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # ------------------ SPEECH TO TEXT ------------------
# @app.route("/speech-to-text", methods=["POST"])
# def speech_to_text():
#     try:
#         if "file" not in request.files:
#             return jsonify({"error": "No file uploaded"}), 400
#         file = request.files["file"]
#         filepath = os.path.join(UPLOAD_FOLDER, file.filename)
#         file.save(filepath)

#         recognizer = sr.Recognizer()
#         with sr.AudioFile(filepath) as source:
#             audio = recognizer.record(source)
#         text = recognizer.recognize_google(audio)

#         return jsonify({"text": text})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # ------------------ TEXT TO SPEECH ------------------
# @app.route("/text-to-speech", methods=["POST"])
# def text_to_speech():
#     try:
#         data = request.json
#         text = data.get("text", "")
#         if not text.strip():
#             return jsonify({"error": "No text provided"}), 400

#         tts = gTTS(text)
#         output_path = os.path.join(UPLOAD_FOLDER, "output.mp3")
#         tts.save(output_path)
#         return send_file(output_path, as_attachment=True)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # ------------------ TRANSLATION ------------------
# @app.route("/translate", methods=["POST"])
# def translate_text():
#     try:
#         data = request.json
#         text = data.get("text", "")
#         target_lang = data.get("target", "en")
#         if not text.strip():
#             return jsonify({"error": "No text provided"}), 400

#         translator = Translator()
#         translation = translator.translate(text, dest=target_lang)
#         return jsonify({"translated_text": translation.text})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # ------------------ SENTIMENT ------------------
# @app.route("/sentiment", methods=["POST"])
# def sentiment_analysis():
#     try:
#         data = request.json
#         text = data.get("text", "")
#         if not text.strip():
#             return jsonify({"error": "No text provided"}), 400

#         blob = TextBlob(text)
#         polarity = blob.sentiment.polarity
#         sentiment = "Positive" if polarity > 0 else "Negative" if polarity < 0 else "Neutral"
#         return jsonify({"sentiment": sentiment, "score": polarity})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # ------------------ EXPORT TO DOCX ------------------
# @app.route("/export-docx", methods=["POST"])
# def export_docx():
#     try:
#         data = request.json
#         text = data.get("text", "")
#         if not text.strip():
#             return jsonify({"error": "No text provided"}), 400

#         doc = Document()
#         doc.add_paragraph(text)
#         output_path = os.path.join(UPLOAD_FOLDER, "output.docx")
#         doc.save(output_path)
#         return send_file(output_path, as_attachment=True)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # ------------------ TEST ROUTE ------------------
# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({"message": "✅ Flask API running with STT, TTS, Summarizer, Translation, Sentiment & DOCX Export"})

# if __name__ == "__main__":
#     app.run(debug=True)


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from textblob import TextBlob
# from sumy.parsers.plaintext import PlaintextParser
# from sumy.nlp.tokenizers import Tokenizer
# from sumy.summarizers.lsa import LsaSummarizer

# app = Flask(__name__)
# CORS(app)

# # ----------------- Summarizer -----------------
# def simple_summarize(text, sentences_count=3):
#     parser = PlaintextParser.from_string(text, Tokenizer("english"))
#     summarizer = LsaSummarizer()
#     summary = summarizer(parser.document, sentences_count)
#     return " ".join([str(sentence) for sentence in summary])

# # ----------------- Sentiment Analysis -----------------
# def analyze_sentiment(text):
#     blob = TextBlob(text)
#     polarity = blob.sentiment.polarity  # -1 (negative) → +1 (positive)
#     subjectivity = blob.sentiment.subjectivity  # 0 (objective) → 1 (subjective)

#     if polarity > 0.1:
#         mood = "Positive"
#     elif polarity < -0.1:
#         mood = "Negative"
#     else:
#         mood = "Neutral"

#     return {
#         "mood": mood,
#         "polarity": round(polarity, 3),
#         "subjectivity": round(subjectivity, 3)
#     }

# # ----------------- API Routes -----------------
# @app.route("/summarize", methods=["POST"])
# def summarize_text():
#     data = request.json
#     text = data.get("text", "")

#     if not text.strip():
#         return jsonify({"error": "No text provided"}), 400

#     summary = simple_summarize(text, sentences_count=3)
#     sentiment = analyze_sentiment(text)

#     return jsonify({
#         "original_text": text,
#         "summary": summary,
#         "sentiment": sentiment
#     })

# # ----------------- Main -----------------
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)



# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# import os
# import speech_recognition as sr
# from gtts import gTTS
# from io import BytesIO

# app = Flask(__name__)
# CORS(app)

# UPLOAD_FOLDER = "uploads"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # 🎤 AUDIO → TEXT
# @app.route("/stt", methods=["POST"])
# def speech_to_text():
#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400
    
#     file = request.files["file"]
#     file_path = os.path.join(UPLOAD_FOLDER, file.filename)
#     file.save(file_path)

#     recognizer = sr.Recognizer()
#     with sr.AudioFile(file_path) as source:
#         audio = recognizer.record(source)

#     try:
#         text = recognizer.recognize_google(audio)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     return jsonify({"text": text})


# # 🔊 TEXT → AUDIO
# @app.route("/tts", methods=["POST"])
# def text_to_speech():
#     data = request.get_json()
#     text = data.get("text", "")
#     if not text:
#         return jsonify({"error": "No text provided"}), 400

#     tts = gTTS(text=text, lang="en")
#     audio_io = BytesIO()
#     tts.write_to_fp(audio_io)
#     audio_io.seek(0)

#     return send_file(audio_io, mimetype="audio/mp3", as_attachment=False)


# if __name__ == "__main__":
#     app.run(debug=True, port=5000)



# voice_service.py
# from flask import Flask, request, jsonify, send_file, make_response
# from flask_cors import CORS
# import os
# import uuid
# from gtts import gTTS
# import speech_recognition as sr
# from pydub import AudioSegment
# from io import BytesIO

# app = Flask(__name__)
# CORS(app, resources={r"*": {"origins": "*"}})

# UPLOAD_FOLDER = "uploads"
# OUTPUT_FOLDER = "outputs"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# os.makedirs(OUTPUT_FOLDER, exist_ok=True)


# def convert_to_wav(input_file_path, output_file_path):
#     """
#     Convert input audio to WAV PCM 16k/mono which works best with speech_recognition
#     """
#     try:
#         audio = AudioSegment.from_file(input_file_path)
#         audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)
#         audio.export(output_file_path, format="wav")
#         return True
#     except Exception as e:
#         app.logger.error("Conversion to wav failed: %s", e)
#         return False


# @app.route("/att", methods=["POST"])
# def audio_to_text():
#     """
#     Accepts multipart form-data with 'file' and returns JSON { text: "..." }
#     (This endpoint name matches the Spring AudioController mapping)
#     """
#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files["file"]
#     original_filename = file.filename or f"upload_{uuid.uuid4().hex}"
#     save_path = os.path.join(UPLOAD_FOLDER, f"{uuid.uuid4().hex}_{original_filename}")
#     file.save(save_path)

#     # convert to WAV for more reliable recognition
#     wav_path = save_path + ".wav"
#     converted = convert_to_wav(save_path, wav_path)
#     target_path = wav_path if converted else save_path

#     r = sr.Recognizer()
#     try:
#         with sr.AudioFile(target_path) as source:
#             audio_data = r.record(source)

#         # use Google's free recognizer (internet required)
#         text = r.recognize_google(audio_data)
#         return jsonify({"text": text})
#     except sr.UnknownValueError:
#         return jsonify({"error": "Speech not recognized"}), 422
#     except sr.RequestError as e:
#         return jsonify({"error": f"Speech service error: {e}"}), 503
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
#     finally:
#         # cleanup
#         try:
#             os.remove(save_path)
#         except Exception:
#             pass
#         try:
#             if os.path.exists(wav_path):
#                 os.remove(wav_path)
#         except Exception:
#             pass


# # alias (older code used /stt)
# @app.route("/stt", methods=["POST"])
# def stt_alias():
#     return audio_to_text()


# @app.route("/tts", methods=["POST"])
# def text_to_speech():
#     """
#     Accepts JSON { text: "...", lang: "en" (optional) }
#     Returns an mp3 file (audio/mpeg).
#     """
#     data = request.get_json() or {}
#     text = data.get("text", "")
#     lang = data.get("lang", "en")

#     if not text or not text.strip():
#         return jsonify({"error": "Text is required"}), 400

#     try:
#         tts = gTTS(text=text, lang=lang)
#         buffer = BytesIO()
#         tts.write_to_fp(buffer)
#         buffer.seek(0)

#         # create a response to return audio bytes (attachment)
#         return send_file(buffer, mimetype="audio/mpeg", as_attachment=True, download_name="output.mp3")
#     except Exception as e:
#         app.logger.error("TTS error: %s", e)
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(debug=True, host="0.0.0.0", port=5000)




# noisy


from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import uuid
from gtts import gTTS
import speech_recognition as sr
from pydub import AudioSegment
from io import BytesIO

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


def convert_to_wav(input_file_path, output_file_path):
    """
    Convert input audio to WAV PCM 16k/mono which works best with speech_recognition
    """
    try:
        audio = AudioSegment.from_file(input_file_path)
        audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)
        audio.export(output_file_path, format="wav")
        return True
    except Exception as e:
        app.logger.error("Conversion to wav failed: %s", e)
        return False


@app.route("/att", methods=["POST"])
def audio_to_text():
    """
    Accepts multipart form-data with 'file' and returns JSON { text: "..." }
    (This endpoint name matches the Spring AudioController mapping)
    """
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    original_filename = file.filename or f"upload_{uuid.uuid4().hex}"
    save_path = os.path.join(UPLOAD_FOLDER, f"{uuid.uuid4().hex}_{original_filename}")
    file.save(save_path)

    # convert to WAV for more reliable recognition
    wav_path = save_path + ".wav"
    converted = convert_to_wav(save_path, wav_path)
    target_path = wav_path if converted else save_path

    r = sr.Recognizer()
    try:
        with sr.AudioFile(target_path) as source:
            # ✅ Noise reduction calibration
            r.adjust_for_ambient_noise(source, duration=1)

            # ✅ Tune for noisy WAV (higher threshold, adaptive enabled)
            r.energy_threshold = 4000
            r.dynamic_energy_threshold = True

            audio_data = r.record(source)

        # use Google's free recognizer (internet required)
        text = r.recognize_google(audio_data)
        return jsonify({"text": text})
    except sr.UnknownValueError:
        return jsonify({"error": "Speech not recognized"}), 422
    except sr.RequestError as e:
        return jsonify({"error": f"Speech service error: {e}"}), 503
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # cleanup
        try:
            os.remove(save_path)
        except Exception:
            pass
        try:
            if os.path.exists(wav_path):
                os.remove(wav_path)
        except Exception:
            pass


# alias (older code used /stt)
@app.route("/stt", methods=["POST"])
def stt_alias():
    return audio_to_text()


@app.route("/tts", methods=["POST"])
def text_to_speech():
    """
    Accepts JSON { text: "...", lang: "en" (optional) }
    Returns an mp3 file (audio/mpeg).
    """
    data = request.get_json() or {}
    text = data.get("text", "")
    lang = data.get("lang", "en")

    if not text or not text.strip():
        return jsonify({"error": "Text is required"}), 400

    try:
        tts = gTTS(text=text, lang=lang)
        buffer = BytesIO()
        tts.write_to_fp(buffer)
        buffer.seek(0)

        # create a response to return audio bytes (attachment)
        return send_file(buffer, mimetype="audio/mpeg", as_attachment=True, download_name="output.mp3")
    except Exception as e:
        app.logger.error("TTS error: %s", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
