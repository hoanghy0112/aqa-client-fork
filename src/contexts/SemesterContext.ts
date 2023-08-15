import { Dispatch, SetStateAction, createContext } from "react";

const SemesterContext = createContext<{
	semester: Semester | undefined;
	setSemester: (data: Semester | undefined) => void;
}>({
	semester: undefined,
	setSemester: (data) => {},
});

export default SemesterContext;
