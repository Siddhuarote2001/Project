from flask import Flask, request
from flask_cors import CORS
import Audiodownloader as ad
import Transcriptgenerator as tg
import Summarize as sm
import Translation as tl
import VideotoAudio as va
import os


app = Flask(__name__)
CORS(app)

@app.get('/summary')
def summary_api():
    url = request.args.get('url', '')
    audio_file = ad.youtube_audio_downloader(url) 
    transcript = tg.transcribe(audio_file)
    summary = sm.summarizemain(transcript)
    os.remove(audio_file)
    os.remove(transcript)
    return summary, 200

@app.get('/videosummary')
def summarize_video():
    filename = request.args.get('filename', '')
    va.video_to_audio(filename)
    transcript = tg.transcribe("audio.mp3")
    summary = sm.summarizemain(transcript)
    os.remove("audio.mp3")
    os.remove(transcript)
    return summary, 200




@app.get('/translate')
def translate_api():
    text = request.args.get('summary')
    language = request.args.get('language')
    translation = tl.translate1(text, language)
    return translation, 200

if __name__ == '__main__':
    app.run()
