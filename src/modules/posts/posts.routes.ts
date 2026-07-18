import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { role } from "../../../generated/prisma/enums";
import { postsController } from "./posts.controller";

const router = Router();

router.get("/", postsController.getAllPost);
router.get(
	"/stats",
	auth(role.ADMIN, role.USER),
	postsController.getPostsStats,
);
router.get(
	"/my-posts",
	auth(role.ADMIN, role.USER),
	postsController.getMyPosts,
);
router.get("/:postId", postsController.getPostById);

router.post("/", auth(role.ADMIN, role.USER), postsController.createPosts);



router.patch(
	"/:postId",
	auth(role.ADMIN, role.USER),
	postsController.updatePosts,
);
router.delete(
	"/:postId",
	auth(role.ADMIN, role.USER),
	postsController.deletePost,
);

export const postsRoutes = router;
