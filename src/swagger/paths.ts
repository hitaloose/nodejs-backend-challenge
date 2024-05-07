import { loginPath } from "./paths/auth/loginPath";
import { logonPath } from "./paths/auth/logonPath";
import { createPostPath } from "./paths/posts/createPostPath";
import { deletePostPath } from "./paths/posts/deletePostPath";
import { getPostPath } from "./paths/posts/getPostPath";
import { listPostPath } from "./paths/posts/listPostsPath";
import { updatePostPath } from "./paths/posts/updatePostPath";

export const paths = {
  "/logon": logonPath,
  "/login": loginPath,
  "/posts": { ...createPostPath, ...listPostPath },
  "/posts/{postId}": { ...getPostPath, ...updatePostPath, ...deletePostPath },
};
