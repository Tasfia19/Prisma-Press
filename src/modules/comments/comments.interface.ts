import { CommentStatus } from "../../../generated/prisma/enums";

export interface comment {
	content: string;
	authorId?: string;
	postId: string;
	status?: CommentStatus;
}
