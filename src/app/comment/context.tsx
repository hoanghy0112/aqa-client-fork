import { createContext } from "react";

export const CommentContext = createContext<ICommentContext | undefined>(
	undefined
);

export interface ICommentContext {}
