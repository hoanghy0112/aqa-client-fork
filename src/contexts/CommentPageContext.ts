"use client";

import { createContext } from "react";

export const CommentContext = createContext<ICommentContext>({
	keyword: "",
	isLoading: false,
});

export interface ICommentContext {
	keyword: string;
	isLoading: boolean;
	setIsLoading?: (d: boolean) => any;
}
