import { PostStatus } from "../../../generated/prisma/enums";

export interface createPost {
	title: string;
	content: string;
	thumbnail?: string;
	isFeatured?: boolean;
	status?: PostStatus;
	tags?: string[];
}


export interface updatePost {
	title?: string;
	content?: string;
	thumbnail?: string;
	isFeatured?: boolean;
	status?: PostStatus;
	tags?: string[];
}
