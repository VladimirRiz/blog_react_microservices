const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const commentsById = {};

app.get("/posts/:id/comments", (req, res) => {
	const { id } = req.params;
	res.send(commentsById[id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
	const commentId = randomBytes(4).toString("hex");
	const { content } = req.body;
	const { id } = req.params;
	const comments = commentsById[id] || [];
	comments.push({
		id: commentId,
		content,
	});
	commentsById[id] = comments;

	res.status(201).send(comments);
});

app.listen(4001, () => {
	console.log("Listening on 4001");
});
