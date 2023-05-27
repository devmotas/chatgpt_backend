const cors = require("cors");
const express = require("express");
const userRoutes = require("./routes/users.js");
const functions = require("firebase-functions");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", userRoutes);

// Exportar a instância do Express para uso no Firebase Functions
exports.app = functions.https.onRequest(app);
