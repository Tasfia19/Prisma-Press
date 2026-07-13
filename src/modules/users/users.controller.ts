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


const userCreate = catchAsync(async (req: Request, res: Response,next:NextFunction) => {

        const payload = req.body;

        const user = await usersService.registerUserIntoDb(payload);

        res.status(httpStatus.CREATED).json({
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User registered successfully",
            data: { user },
        });
    });


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
export const usersController = {
	userCreate,
};
