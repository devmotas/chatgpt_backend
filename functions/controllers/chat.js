const axios = require("axios");

exports.chat = async (req, res) => {
  const {prompt} = req.body;
  const firstWord = prompt.trim().split(" ")[0];

  try {
    let response;

    if (firstWord.toLowerCase() !== "imagine") {
      response = await processText(req, res);
    } else {
      response = await generateImage(req, res);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};

const generateImage = async (req, res) => {
  const {apiKey, prompt} = req.body;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };
  const body = {
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  };

  try {
    const response = await axios.post("https://api.openai.com/v1/images/generations", body, {headers});
    const imageUrl = response.data.data[0].url;
    console.log(imageUrl);
    return {data: imageUrl, type: "image"};
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

const processText = async (req, res) => {
  const {apiKey, prompt} = req.body;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
    "Accept-Charset": "utf-8",
  };
  const body = {
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 200,
    temperature: 0.9,
  };

  try {
    const response = await axios.post("https://api.openai.com/v1/completions", body, {headers});
    const trimmedText = response.data.choices[0].text.trim();
    console.log(JSON.stringify(trimmedText));
    return {data: trimmedText, type: "text"};
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};
