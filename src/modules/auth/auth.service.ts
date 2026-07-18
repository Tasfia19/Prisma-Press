import { Payload } from "./../../../generated/prisma/internal/prismaNamespace";
import bcrypt from "bcryptjs";

import { ILoginAdmin, ILoginUser } from "./auth.interface";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";

const loginUser = async (payload: ILoginUser) => {
	const { email, password } = payload;

	// const user = await prisma.user.findUnique({
	//     where: {
	//         email,
	//     }
	// });
	// if (!user) {
	//     throw new Error("Invalid email or password");
	// }

	const user = await prisma.user.findUniqueOrThrow({
		where: { email },
	});

	const isPasswordMatched = await bcrypt.compare(password, user.password);

	if (!isPasswordMatched) {
		throw new Error("Password not matched");
	}
	const jwtPayload = {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};
	// const accessToken = jwt.sign(jwtPayload, config.jwt_access_Token, {
	// 	expiresIn: config.jwt_access_Token_Expires_In,
	// } as SignOptions);

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_Token,
		config.jwt_access_Token_Expires_In as SignOptions,
	);

	// const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_Token, {
	// 	expiresIn: config.jwt_refresh_Token_Expires_In!,
	// } as SignOptions);
	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_Token,
		config.jwt_refresh_Token_Expires_In as SignOptions,
	);
	return {
		accessToken,
		refreshToken,
		role:user.role,
	};
	// return user;
};

// const AdminLogin = async (payload: ILoginAdmin) => {
// 	const { email, password } = payload;

// 	const admin = await prisma.user.findUniqueOrThrow({
// 		where: {
// 			email,
// 		},
// 	});
// 	const isPasswordMatched = await bcrypt.compare(password, admin.password);
// 	if (!isPasswordMatched) {
// 		throw new Error("Password not matched");
// 	}
// 	const jwtPayload = {
// 		id: admin.id,
// 		name: admin.name,
// 		email: admin.email,
// 		role: admin.role,
// 	};
// 	const accessToken = jwtUtils.createToken(
// 		jwtPayload,
// 		config.jwt_access_Token,
// 		config.jwt_access_Token_Expires_In as SignOptions,
// 	);

// 	const refreshToken = jwtUtils.createToken(
// 		jwtPayload,
// 		config.jwt_refresh_Token,
// 		config.jwt_refresh_Token_Expires_In as SignOptions,
// 	);
// 	return {
// 		accessToken,
// 		refreshToken,
// 	};

// };

const refreshToken = async (refreshToken: string) => {
	const verifyRefreshToken = jwtUtils.verifyToken(
		refreshToken,
		config.jwt_refresh_Token,
	);

	if (!verifyRefreshToken.success) {
		throw new Error(verifyRefreshToken.error);
	}

	const { id } = verifyRefreshToken.data as JwtPayload;

	const user = await prisma.user.findUniqueOrThrow({
		where: { id },
	});

	if (user.activeStatus === "INACTIVE") {
		throw new Error("User is Inactive");
	}

	const JwtPayload = {
		id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		JwtPayload,
		config.jwt_access_Token,
		config.jwt_access_Token_Expires_In as SignOptions,
	);

	return accessToken;
};
export const authService = {
	loginUser,
	refreshToken,
};
