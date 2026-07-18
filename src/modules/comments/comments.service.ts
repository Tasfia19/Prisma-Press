import { CommentStatus } from "./../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { comment } from "./comments.interface";

const createComment = async (payload: comment, userId: string) => {
	const result = await prisma.comment.create({
		data: {
			...payload,
			authorId: userId,
		},
	});
	return result;
};
const getCommentByIdFromDb = async (commentId: string) => {
	const result = await prisma.comment.findUniqueOrThrow({
		where: {
			id: commentId,
		},
	});
	return result;
};
const getCommentByAuthorIdFromDb = async (authorId: string) => {
	const result = await prisma.comment.findMany({
		where: {
			id: authorId,
		},
	});
	return result;
};

const updateComment = async (
	authorId: string,
	commentId: string,
	payload: comment,
	isUser: boolean,
) => {
	const comment = await prisma.comment.findUniqueOrThrow({
		where: {
			id: commentId,
		},
	});
	if (!isUser && comment.authorId !== authorId) {
		throw new Error("You Are not authorized");
	}

	const result = await prisma.comment.update({
		where: {
			id: commentId,
		},
		data: payload,
	});
	return result;
};

const deleteComment = async (
	authorId: string,
	commentId: string,
	isUser: boolean,
) => {
	const comment = await prisma.comment.findUniqueOrThrow({
		where: {
			id: commentId,
		},
	});
	if (!isUser && comment.authorId !== authorId) {
		throw new Error("You Are not authorized");
	}

	await prisma.comment.delete({
		where: {
			id: commentId,
		},
	});
	return null;
};

const moderateComment = async (
	commentId: string,
	CommentStatus: string,
	isAdmin: boolean,
) => {
	const comment = await prisma.comment.findUniqueOrThrow({
		where: {
			id: commentId,
		},
	});
	if (!isAdmin) {
		throw new Error("You Are not authorized");
	}

	const moderatedCommentStatus = await prisma.comment.update({
		where: {
			id: commentId,
		},
		data: {
			status: CommentStatus as CommentStatus,
		},
	});
	return moderatedCommentStatus;
};
export const commentService = {
	createComment,
	getCommentByIdFromDb,
	getCommentByAuthorIdFromDb,
	updateComment,
	deleteComment,
	moderateComment,
};
