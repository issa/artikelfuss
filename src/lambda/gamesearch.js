import axios from "axios";
var querystring = require("querystring");

export async function handler(event, context) {
  const { queryStringParameters: { query = null } = {} } = event;
  try {
    const games = await axios.get(
      `https://boardgamegeek.com/search/boardgame?${querystring.stringify({
        q: query,
        showcount: 20
      })}`,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "User-Agent":
            "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0"
        }
      }
    );

    const { data = null } = games;

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data && data.items })
    };
  } catch (err) {
    console.log(err); // output to netlify function log

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
