const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

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
		status: "pending",
	});
	commentsById[id] = comments;

	axios.post("http://localhost:4005/events", {
		type: "CommentCreated",
		data: {
			id: commentId,
			content,
			postId: id,
			status: "pending",
		},
	});

	res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
	console.log("Events received", req.body.type);

	const { type, data } = req.body;

	if (type === "CommentModerated") {
		const { postId, id, status } = data;

		const comments = commentsById[postId];
		const comment = comments.find((comment) => comment.id === id);

		await axios.post("http://localhost:4005/events", {
			type: "CommentCreated",
			data: {
				id: commentId,
				content,
				postId: id,
				status: status,
			},
		});
	}

	res.send({});
});

app.listen(4001, () => {
	console.log("Listening on 4001");
});
