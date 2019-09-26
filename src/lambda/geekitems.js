import axios from "axios";
var querystring = require("querystring");

export async function handler(event, context) {
  const { queryStringParameters: { id = null, type = null } = {} } = event;
  try {
    const games = await axios.get(
      `https://api.geekdo.com/api/geekitems?${querystring.stringify({
        objectid: id,
        objecttype: type
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg: data })
    };
  } catch (err) {
    console.log(err); // output to netlify function log

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
