import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import { authService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/TSendResponse";

const loginUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const payload = req.body;

		const { accessToken, refreshToken,role } = await authService.loginUser(payload);

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24, //1day
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24 * 7, //7day
		});
		const loginMessage =
			role === "ADMIN"
				? "Admin logged in successfully"
				: "User logged in successfully";

		sendResponse(res, {
			success: true,
			statusCode: 200,
			message: loginMessage,
			data: { accessToken, refreshToken },
		});
	},
);

const refreshToken = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const refreshToken = req.cookies.refreshToken;

		const accessToken = await authService.refreshToken(refreshToken);
		
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24, //1day
		});
		sendResponse(res, {
			success: true,
			statusCode: httpStatus.OK,
			message: "Refresh Token generated successfully",
			data: accessToken,
		});
	},
);
export const authController = {
	loginUser,
	refreshToken,
};
