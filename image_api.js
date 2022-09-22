const axios = require('axios')

const get_search_page = async (keywords) => {
  try {
    return await axios.post('https://duckduckgo.com/', new URLSearchParams({'q': keywords}),
    {
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Content-Length': '21',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
        }
    });
  } catch (error) {
    console.error(error);
  }
}

const make_search = async (keywords, token) => {
    try {
        return await axios.get('https://duckduckgo.com/i.js', {
        params: {
            'l': 'us-en',
            'o': 'json',
            'q': keywords,
            'vqd': token,
            'f': ',,,',
            'p': '1',
            'v7exp': 'a'
            },
        headers: {
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'accept': 'application/json, text/javascript, */* q=0.01',
            'accept-language': 'en-US,enq=0.9',
            'authority': 'duckduckgo.com',
            'referer': 'https://duckduckgo.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest'
            }
        });
    }
    catch (error) {
        console.error(error);
    }
} 

  
const get_url = async (keywords) => {
    const base_page = await get_search_page(keywords)  //Get base page

    var re = /vqd=([\d-]+)\&/;  //Regex for finding search token 

    var token = re.exec(base_page.data)[1];  

    const search = await make_search(keywords, token) //Actual search

    if(search.data.results) {

        console.log(search.data.results[0]['thumbnail'])

        return search.data.results[0]['thumbnail'] //Returns URL 
    }

    else {
        return -1
    }
}

get_url('chocolate');


