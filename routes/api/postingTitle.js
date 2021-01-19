/** @format */

const express = require("express");
const router = express.Router();
const {
	getPostingTitles,
	createPostingTitle,
	updatePostingTitle,
	getOnePostingTitle,
	deletePostingTitle
} = require("../../controllers/postingTitleController");

router.route("/").get(getPostingTitles).post(createPostingTitle);
router
	.route("/:id")
	.get(getOnePostingTitle)
	.patch(updatePostingTitle)
	.delete(deletePostingTitle);

module.exports = router;
