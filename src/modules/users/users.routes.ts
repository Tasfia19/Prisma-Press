import { usersController } from "./users.controller";
import { Router } from "express";

const router = Router();

router.post("/register", usersController.userCreate);

export const usersRoutes = {
	router,
};


