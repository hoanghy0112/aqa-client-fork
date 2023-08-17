"use client";

import { FacultyContext } from "@/contexts/FacultyContext";
import { ProgramContext } from "@/contexts/ProgramContext";
import { ReactNode, useState, createContext } from "react";

export default function CommentProvider({ children }: { children: ReactNode }) {
	const [keyword, setKeyword] = useState("");
	const [program, setProgram] = useState("");
	const [faculty, setFaculty] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	return (
		<CommentContext.Provider
			value={{
				keyword,
				setKeyword: (data: string) => {
					setKeyword(data);
				},
				program,
				setProgram,
				isLoading,
				setIsLoading: (data: boolean) => {
					setIsLoading(data);
				},
			}}
		>
			<ProgramContext.Provider value={{ program, setProgram }}>
				<FacultyContext.Provider value={{ faculty, setFaculty }}>
					{children}
				</FacultyContext.Provider>
			</ProgramContext.Provider>
		</CommentContext.Provider>
	);
}

export const CommentContext = createContext<ICommentContext>({
	keyword: "",
	setKeyword: (d: string) => {},
	program: "",
	setProgram: (d: string) => {},
	isLoading: false,
	setIsLoading: (d: boolean) => {},
});

export interface ICommentContext {
	keyword: string;
	setKeyword: (data: string) => void;
	program: string;
	setProgram: (d: string) => any;
	isLoading: boolean;
	setIsLoading: (data: boolean) => void;
}
