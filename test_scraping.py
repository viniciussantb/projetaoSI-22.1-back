import requests
import re
import json
import time

def duck_duck_img_search(keywords):

    url = 'https://duckduckgo.com/'
    params = {
    	'q': keywords
    }

    print("Getting DuckDuckGo Token")

    res = requests.post(url, data=params)
    searchObj = re.search(r'vqd=([\d-]+)\&', res.text, re.M|re.I)

    if not searchObj:
        print("Token Parsing Failed !")
        return -1

    print(f"Token: {searchObj.group(0)}")

    headers = {
        'authority': 'duckduckgo.com',
        'accept': 'application/json, text/javascript, */* q=0.01',
        'sec-fetch-dest': 'empty',
        'x-requested-with': 'XMLHttpRequest',
        'user-agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'referer': 'https://duckduckgo.com/',
        'accept-language': 'en-US,enq=0.9',
    }

    params = {
        'l': 'us-en',
        'o': 'json',
        'q': keywords,
        'vqd': searchObj.group(1),
        'f': ',,,',
        'p': '1',
        'v7exp': 'a',
    }

    print(f'Requesting "{keywords}"')	

    while True:
        try:
            res = requests.get('https://duckduckgo.com/i.js', headers=headers, params=params)
            data = json.loads(res.text)
            break
        except ValueError as e:
            print(f"Failed to request {keywords} with error {e}. Trying again in 5 secs...")
            time.sleep(5)
            continue

    print("Success!")

    print(data["results"][0]["image"])
    print(data["results"][0]["thumbnail"])


duck_duck_img_search("peito de peru sadia")