import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		fetchComments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchComments = async () => {
		const res = await axios.get(
			`http://localhost:4001/posts/${postId}/comments`
		);
		setComments(res.data);
	};

	const renderedComments = comments.map((comment) => (
		<li key={comment.id}>{comment.content}</li>
	));

	return <ul>{renderedComments}</ul>;
};

export default CommentList;
