import { jwtUtils } from "./../../utils/jwt";
import express, {
	Application,
	NextFunction,
	Request,
	RequestHandler,
	Response,
} from "express";
import httpStatus from "http-status-codes";
import { usersService } from "./users.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/TSendResponse";
import config from "../../config";
import jwt from "jsonwebtoken";

const userCreate = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const payload = req.body;

		const user = await usersService.registerUserIntoDb(payload);

		sendResponse(res, {
			success: true,
			statusCode: httpStatus.CREATED,
			message: "User registered successfully",
			data: { user },
		});
	},
);

const getMyProfile = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// const { accessToken } = req.cookies;
		// const verifiedToken = jwtUtils.verifyToken(
		// 	accessToken,
		// 	config.jwt_access_Token,
		// );
		// console.log(verifiedToken);

		// if (typeof verifiedToken === "string") {
		// 	throw new Error("Invalid Token");
		// }
		const profile = await usersService.getMyProfileFromDb(
			req.user?.id as string,
		);

		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "User Profile fetched Successfully",
			data: { profile },
		});
	},
);

const updateMyProfile = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const payload = req.body;
		const userId = req.user?.id as string;
		const updatedProfile = await usersService.updateMyProfileInDb(
			userId,
			payload,
		);

		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "User Profile Updated Successfully",
			data: { updatedProfile },
		});
	},
);
export const usersController = {
	userCreate,
	getMyProfile,
	updateMyProfile,
};

// const userCreate = async (req: Request, res: Response) => {
// 	try {
// 		const payload = req.body;
// 		const user = await usersService.registerUserIntoDb(payload);
// 		res.status(httpStatus.CREATED).json({
// 			success: true,
// 			statusCode: httpStatus.CREATED,
// 			message: "User registered successfully",
// 			data: { user },
// 		});
// 	}
// 	catch (error: any) {
// 		res.status(httpStatus.BAD_REQUEST).json({
// 			success: false,
// 			statusCode: httpStatus.BAD_REQUEST,
// 			message: error.message || "User registration failed",
// 		});
// 	}

// };
