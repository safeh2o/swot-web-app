import * as keystone from "keystone";
import { ModelService } from "./ModelService";

/**
 * PostCategory Model
 * ==================
 */

const PostCategory = new keystone.List("PostCategory", {
	autokey: { from: "name", path: "key", unique: true },
});

PostCategory.add({
	name: { type: String, required: true },
});

PostCategory.relationship({
	ref: "Post",
	path: "posts",
	refPath: "categories",
});

PostCategory.register();

export type PostCategoryType = {
	name: string;
	_id: string;
	key: string;
};

export const PostCategoryService = new ModelService<PostCategoryType>(PostCategory);
