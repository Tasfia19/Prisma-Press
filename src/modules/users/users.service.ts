import express, { Application, Request, Response } from "express";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { UserCreatePayload } from "./users.interface";
import { role as RoleEnum } from "../../../generated/prisma/enums";

const registerUserIntoDb = async (payload: UserCreatePayload) => {
	const { name, email, password, profilePhoto, role } = payload;

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
			role: role as RoleEnum,
			profile: {
				create: {
					profileName: name,
					profilePhoto,
				},
			},
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
			role: createdUser.role,
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

const getMyProfileFromDb = async (userId: string) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: { id: userId },
		omit: { password: true },
		include: {
			profile: true,
		},
	});
	return user;
};

const updateMyProfileInDb = async (userId: string, payload: any) => {
	const { name, email, profilePhoto, bio } = payload;

	const updatedProfile = await prisma.user.update({
		where: { id: userId },
		data: {
			name,
			email,
			profile: {
				update: {
					profilePhoto,
					bio,
				},
			},
		},
		omit: {
			password: true,
		},
		include: {
			profile: true,
		},
	});
	return updatedProfile;
};
export const usersService = {
	registerUserIntoDb,
	getMyProfileFromDb,
	updateMyProfileInDb,
};
