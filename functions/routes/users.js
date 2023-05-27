/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require("express");
const {chat} = require("../controllers/chat.js");
const {login} = require("../controllers/login.js");
const {addUser, deleteUser, getUsers, updatePassword, updateUser} = require("../controllers/user.js");
const router = express.Router();

router.get("/get-users", getUsers);
router.post("/create-user", addUser);
router.put("/update-user/:id", updateUser);
router.put("/destroy-user/:id", deleteUser);
router.put("/update-password/:id", updatePassword);
router.post("/login", login);
router.post("/chat", chat);

module.exports = router;
