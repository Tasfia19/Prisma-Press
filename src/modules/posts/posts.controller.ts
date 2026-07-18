import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postsService } from "./posts.service";
import { sendResponse } from "../../utils/TSendResponse";

const getAllPost = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const result = await postsService.getAllPostFromDb();
		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "All Posts Fetched Successfully",
			data: result,
		});
	},
);

const getPostById = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const postId = req.params.postId;

		if (!postId) {
			throw new Error("Post Id required");
		}
		const result = await postsService.gePostByIdFromDb(postId as string);

		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "Post Fetched Successfully",
			data: result,
		});
	},
);

const getPostStats = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {},
);
const getMyPosts = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const authorId = req.user?.id;
		const result = await postsService.getMyPostsFromDb(authorId as string);

		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "My Posts Fetched Successfully",
			data: result,
		});
	},
);
const getPostsStats = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const result = await postsService.postStatsFromDb();

		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "Post stats retrieved successfully",
			data: result,
		});
	},
);

const createPosts = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.user?.id;
		const payload = req.body;
		const result = await postsService.createPostsInDb(payload, id as string);

		sendResponse(res, {
			success: true,
			statusCode: httpStatus.CREATED,
			message: "Post Created Successfully",
			data: result,
		});
	},
);
const updatePosts = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const authorId = req.user?.id;
		const isAdmin = req.user?.role === "ADMIN";
		const postId = req.params.postId;
		const payload = req.body;
		const result = await postsService.updatePostsInDb(
			postId as string,
			payload,
			authorId as string,
			isAdmin,
		);
		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "Post updated Successfully",
			data: result,
		});
	},
);

const deletePost = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const authorId = req.user?.id;
		const isAdmin = req.user?.role === "ADMIN";
		const postId = req.params.postId;


		await postsService.deletePostFromDb(
			postId as string,
			authorId as string,
			isAdmin,
		);
		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "Post deleted Successfully",
			data: null,
		});
	},
);

export const postsController = {
	getAllPost,
	getPostById,
	getPostsStats,
	createPosts,
	updatePosts,
	deletePost,
	getMyPosts,
};
