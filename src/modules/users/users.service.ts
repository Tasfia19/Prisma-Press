import express, { Application, Request, Response } from "express";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { UserCreatePayload } from "./users.interface";



const registerUserIntoDb = async (payload: UserCreatePayload) => {
	const { name, email, password, profilePhoto } = payload;

	const isUserExists = await prisma.user.findUnique({ where: { email } });

	if (isUserExists) {
		// return res
		// 	.status(httpStatus.BAD_REQUEST)
		// 	.json({ message: "User already exists" });
		throw new Error("User already exists");
	}
	const hashedPassword = await bcrypt.hash(
		password,
		Number(config.bcrypt_Salt_Rounds),
	);

	const createdUser = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
			profile: {
				create: {
					profileName:name,
					profilePhoto
				}
			}
		},
	});

	// await prisma.profile.create({
	// 	data: {
	// 		userId: createdUser.id,
	// 		profileName: name,
	// 		profilePhoto,
	// 	},
	// });

	const user = await prisma.user.findUnique({
		where: {
			id: createdUser.id,
			email: createdUser.email || email,
		},
		omit: {
			password: true,
		},
		include: {
			profile: true,
		},
	});
	return user;
};
export const usersService = {
	registerUserIntoDb,
};
