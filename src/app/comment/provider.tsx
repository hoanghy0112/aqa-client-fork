"use client";

import { ReactNode, useState } from "react";
import { CommentContext } from "./context";

export default function CommentProvider({ children }: { children: ReactNode }) {
	const [keyword, setKeyword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	return (
		<CommentContext.Provider
			value={{
				keyword,
				setKeyword: (data: string) => {
					setKeyword(data);
				},
				isLoading,
				setIsLoading: (data: boolean) => {
					setIsLoading(data);
				},
			}}
		>
			{children}
		</CommentContext.Provider>
	);
}
