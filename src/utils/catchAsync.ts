import express, {
	Application,
	NextFunction,
	Request,
	RequestHandler,
	Response,
} from "express";
import httpStatus from "http-status-codes";





export const catchAsync = (fn: RequestHandler) => { 
// async (req, res, next) => {

//     const payload = req.body;

//     const user = await usersService.registerUserIntoDb(payload);

//     res.status(201).json(...);

// } this is the try{fn} 
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (error: any) {
			res.status(httpStatus.BAD_REQUEST).json({
				success: false,
				statusCode: httpStatus.BAD_REQUEST,
				message: error.message || "User registration failed",
			});
		}
	};
};
