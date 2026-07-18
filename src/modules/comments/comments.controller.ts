import { role } from "./../../../generated/prisma/enums";
import { comment } from "./comments.interface";
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { commentService } from "./comments.service";
import { sendResponse } from "../../utils/TSendResponse";

const createComment = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const payload = req.body;
		const userId = req.user?.id;

		const result = await commentService.createComment(
			payload,
			userId as string,
		);
		sendResponse(res, {
			success: true,
			statusCode: httpStatus.CREATED,
			message: "Comment Created Successfully",
			data: result,
		});
	},
);
const getCommentByAuthorId = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const authorId = req.user?.id;
		const result = await commentService.getCommentByAuthorIdFromDb(
			authorId as string,
		);
		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "Comment fetched Successfully by Author id",
			data: result,
		});
	},
);
const getCommentById = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const commentId = req.params.commentId;
		const result = await commentService.getCommentByIdFromDb(
			commentId as string,
		);
		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "Comment fetched Successfully by id",
			data: result,
		});
	},
);
const updateComment = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const commentId = req.params.commentId;
		const payload = req.body;
		const authorId = req.user?.id;
		const isUser = req.user?.role === "USER";

		const result = await commentService.updateComment(
			authorId as string,
			commentId as string,
			payload,
			isUser,
		);
		console.log(req.user);
		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "Comment Updated Successfully",
			data: result,
		});
	},
);
const deleteComment = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const commentId = req.params.commentId;
		const authorId = req.user?.id;
		const isUser = req.user?.role === "USER";

		await commentService.deleteComment(
			authorId as string,
			commentId as string,
			isUser,
		);
		console.log(req.user);
		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "Comment Deleted Successfully",
			data: null,
		});
	},
);
const moderateComment = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const commentId = req.params.commentId;

		const { status } = req.body;
		const isUser = req.user?.role === "ADMIN";

		const result = await commentService.moderateComment(
			commentId as string,
			status as string,
			isUser,
		);
		console.log(res);
		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "Comment Status Changed Successfully",
			data: result,
		});
	},
);
export const commentController = {
	createComment,
	getCommentByAuthorId,
	getCommentById,
	deleteComment,
	updateComment,
	moderateComment,
};
