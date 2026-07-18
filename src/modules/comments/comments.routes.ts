
import { Router } from "express";
import { commentController } from "./comments.controller";
import { auth } from "../../middlewares/auth";
import { role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(role.ADMIN, role.USER), commentController.createComment);
router.get("/author/:authorId", commentController.getCommentByAuthorId);
router.get("/:commentId", commentController.getCommentById);
router.patch("/:commentId", auth(role.USER), commentController.updateComment);
router.patch(
	"/:commentId/moderate",
	auth(role.ADMIN),
	commentController.moderateComment,
);
router.delete("/:commentId", auth(role.USER), commentController.deleteComment);

export const commentRoutes = router;
