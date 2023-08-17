import { createContext } from "react";

export const FacultyContext = createContext<IFacultyContext>({});

export interface IFacultyContext {
	faculty?: string;
	setFaculty?: (d: string) => any;
}
