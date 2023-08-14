import { Dispatch, SetStateAction, createContext } from "react";

const SemesterContext = createContext<{
	semester: Semester | undefined;
	setSemester: Dispatch<SetStateAction<Semester | undefined>> | undefined;
}>({
	semester: undefined,
	setSemester: undefined,
});

export default SemesterContext;
