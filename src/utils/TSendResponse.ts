import { TSendResponse } from "../modules/users/users.interface";
import express, {
	Response,
} from "express";

export const sendResponse = <T>(res: Response, data: TSendResponse<T>) => {
	res.status(data.statusCode).json({
		success: data.success,
		statusCode: data.statusCode,
		message: data.message,
		data: data.data,
		meta: data.meta,
	});
};