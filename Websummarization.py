import requests
from bs4 import BeautifulSoup

def websummar(link):
    url = link
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract text data from website
    text_data = ''
    for tag in soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
        text_data += tag.get_text()

    transcript_filename = 'web_data.txt'
    
    
    with open(transcript_filename, 'w', encoding="utf-8") as f: 
        f.write(text_data)
        return transcript_filename
    
    