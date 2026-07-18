import { auth } from "../../middlewares/auth";
import { role } from "../../../generated/prisma/enums";
import { usersController } from "./users.controller";
import { Router } from "express";

const router = Router();

router.post("/register", usersController.userCreate);

router.get("/me", auth(role.ADMIN, role.USER), usersController.getMyProfile);

router.put(
	"/my-profile",
	auth(role.ADMIN, role.USER),
	usersController.updateMyProfile,
);

export const usersRoutes = router;
