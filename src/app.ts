import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config";
import { usersRoutes } from "./modules/users/users.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { postsRoutes } from "./modules/posts/posts.routes";
import { commentRoutes } from "./modules/comments/comments.routes";


const app: Application = express();

app.use(
	cors({
		origin: config.app_url,
		credentials: true,
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.use("/api/users", usersRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentRoutes);

export default app;
