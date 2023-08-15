import { createContext } from "react";

export const CommentContext = createContext<ICommentContext>({
	keyword: "",
	setKeyword: (d: string) => {},
	isLoading: false,
	setIsLoading: (d: boolean) => {},
});

export interface ICommentContext {
	keyword: string;
	setKeyword: (data: string) => void;
	isLoading: boolean;
	setIsLoading: (data: boolean) => void;
}
