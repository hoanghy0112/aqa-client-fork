import { createContext } from "react";

export const ProgramContext = createContext<IProgramContext>({});

export interface IProgramContext {
	program?: string;
	setProgram?: (d: string) => any;
}
