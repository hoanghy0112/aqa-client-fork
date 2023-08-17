"use client";

import { FacultyContext, IFacultyContext } from "@/contexts/FacultyContext";
import { IProgramContext, ProgramContext } from "@/contexts/ProgramContext";
import { ReactNode, useState, createContext } from "react";

export default function CommentProvider({
	children,
}: {
	children: ({
		faculty,
		setFaculty,
		program,
		setProgram,
	}: IFacultyContext &
		IProgramContext & {
			keyword: string;
			setKeyword: (d: string) => any;
			isLoading: boolean;
			setIsLoading: (d: boolean) => any;
		}) => ReactNode;
}) {
	const [keyword, setKeyword] = useState<string>("");
	const [program, setProgram] = useState<string>("");
	const [faculty, setFaculty] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<CommentContext.Provider value={{ keyword, isLoading, setIsLoading }}>
			{children({
				faculty,
				setFaculty,
				program,
				setProgram,
				keyword,
				setKeyword,
				isLoading,
				setIsLoading,
			})}
		</CommentContext.Provider>
	);
}

export const CommentContext = createContext<ICommentContext>({
	keyword: "",
	isLoading: false,
});

export interface ICommentContext {
	keyword: string;
	isLoading: boolean;
	setIsLoading?: (d: boolean) => any;
}
