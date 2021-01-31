/** @format */

const express = require("express");
const router = express.Router();
const { createChat, getChat } = require("../../controllers/messageController");

router.route("/:candidateId").get(getChat).post(createChat);
module.exports = router;
