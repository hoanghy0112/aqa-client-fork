"use client";

import { ReactNode, createContext, useContext, useState } from "react";

export const FilterContext = createContext<IFilterContext>({
	setKeyword: (d: string) => {},
	setIsLoading: (d: boolean) => {},
	setSubjects: (d: Subject[]) => {},
	setCriteria: (d: Criteria) => {},
	setProgram: (d: string) => {},
	setFaculty: (d: string) => {},
	setSemester: (d: Semester) => {},
});

export function useFilter() {
	const filter = useContext(FilterContext);

	return filter;
}

export function FilterProvider({
	keyword: default_keyword = "",
	isLoading: default_isLoading = false,
	subjects: default_subjects,
	criteria: default_criteria,
	program: default_program,
	faculty: default_faculty,
	semester: default_semester,
	children,
}: {
	keyword?: string;
	isLoading?: boolean;
	subjects?: Subject[];
	criteria?: Criteria;
	program?: string;
	faculty?: string;
	semester?: Semester;
	children: ReactNode;
}) {
	const [keyword, setKeyword] = useState(default_keyword);
	const [isLoading, setIsLoading] = useState(default_isLoading);
	const [subjects, setSubjects] = useState(default_subjects);
	const [criteria, setCriteria] = useState(default_criteria);
	const [program, setProgram] = useState(default_program);
	const [faculty, setFaculty] = useState(default_faculty);
	const [semester, setSemester] = useState(default_semester);

	return (
		<FilterContext.Provider
			value={{
				keyword,
				setKeyword,
				isLoading,
				setIsLoading,
				subjects,
				setSubjects,
				criteria,
				setCriteria,
				program,
				setProgram,
				faculty,
				setFaculty,
				semester,
				setSemester,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
}

export interface IFilterContext {
	keyword?: string;
	setKeyword: (d: string) => any;
	isLoading?: boolean;
	setIsLoading: (d: boolean) => any;
	subjects?: Subject[];
	setSubjects: (d: Subject[]) => any;
	criteria?: Criteria;
	setCriteria: (d: Criteria) => any;
	program?: string;
	setProgram: (d: string) => any;
	faculty?: string;
	setFaculty: (d: string) => any;
	semester?: Semester;
	setSemester: (d: Semester) => any;
}
