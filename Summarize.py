def summarizemain(transcript_file):
    import os
    import cohere

    if not os.path.exists(transcript_file): 
        print('The transcript file does not exist!')
        return False

    with open(transcript_file, encoding="utf-8") as f:
        transcript = f.read()

    print('Summarizing...', end='')
    api_key = 'ow1iAybcSwwyJvMHmJqSo45HfpxueFqQK3xvvBh2'
    co = cohere.Client(api_key)

    text = transcript
    prompt = f'''Create a summary of the following text.
    Text: {text}
    Add a title to the summary.
    Your summary should be informative and factual, covering the most important aspects of the topic 
    Start your summary with an INTRODUCTION PARAGRAPH that gives an overview of the topic FOLLOWED 
    by BULLET POINTS if possible AND end the summary with a CONCLUSION.'''
 
  
    response = co.chat(
                        message = prompt, 
                        model="command", 
                        temperature=0.9
                    )

    answer = response.text

    print('Done!')
    summarycode = str(answer)
    # print(summarycode)
    return summarycode
