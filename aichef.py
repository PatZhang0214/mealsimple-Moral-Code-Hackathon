from dotenv import load_dotenv
import os
import requests

def generate(prompt, maxTokens):
    load_dotenv()
    key = os.getenv('OPENAI_API_KEY')
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "gpt-4",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": maxTokens
    }

    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content']
    else:
        return f"Error: {response.status_code}, {response.text}"

cuisine = "chinese"
restrictions = "vegetarian"
time = "30 minutes"
cost = "$10"

prompt = f"Generate a name, ingredients list, and a step-by-step recipe for a meal based on these specifications: \
Cuisine: {cuisine}, \
Dietary Restrictions: {restrictions}, \
Time To Make: {time}, \
Budget: {cost} \
(make the response easy to read and less than 100 words)"

response = generate(prompt, 200)
print(response)
