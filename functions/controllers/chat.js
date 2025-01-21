/* eslint-disable max-len */
const axios = require("axios");

exports.chat = async (req, res) => {
  try {
    const { prompt, language } = req.body;

    // Verificar se o prompt existe e é uma string
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ message: "O campo 'prompt' é obrigatório e deve ser uma string." });
    }

    // Definir o idioma padrão como pt-br, se não especificado
    const lang = language && typeof language === "string" ? language.toLowerCase() : "pt-br";

    const firstWord = prompt.trim().split(" ")[0];
    let response;

    // Decide se é texto ou imagem
    if (firstWord.toLowerCase() !== "imagine") {
      response = await processText(req, res, lang);
    } else {
      response = await generateImage(req, res);
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const generateImage = async (req, res) => {
  try {
    const { apiKey, prompt } = req.body;

    if (!apiKey || typeof apiKey !== "string") {
      throw new Error("A chave da API (apiKey) é obrigatória e deve ser uma string.");
    }
    if (!prompt || typeof prompt !== "string") {
      throw new Error("O campo 'prompt' é obrigatório e deve ser uma string.");
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    };

    const words = prompt.split(" ");
    words.shift(); // Remove a primeira palavra
    const modifiedPrompt = words.join(" ");

    const body = {
      prompt: modifiedPrompt,
      n: 1,
      size: "512x512",
    };

    const response = await axios.post("https://api.openai.com/v1/images/generations", body, { headers });
    const imageUrl = response.data.data[0].url;

    return { data: imageUrl, type: "image" };
  } catch (error) {
    return res.status(500).json({ message: "Erro ao processar resposta!", error: error.message });
  }
};

const processText = async (req, res, lang) => {
  try {
    const { apiKey, prompt } = req.body;

    if (!apiKey || typeof apiKey !== "string") {
      throw new Error("A chave da API (apiKey) é obrigatória e deve ser uma string.");
    }
    if (!prompt || typeof prompt !== "string") {
      throw new Error("O campo 'prompt' é obrigatório e deve ser uma string.");
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "Accept-Charset": "utf-8",
    };

    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `Responda no idioma: ${lang}. ${prompt}` }
      ],
      max_tokens: 100,
      temperature: 0.7,
      top_p: 1,
    };

    const response = await axios.post("https://api.openai.com/v1/chat/completions", body, { headers });
    const trimmedText = response.data.choices[0].message.content.trim();

    return { data: trimmedText, type: "text" };
  } catch (error) {
    throw new Error("Erro ao processar texto: " + error.message);
  }
};
