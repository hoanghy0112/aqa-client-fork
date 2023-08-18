"use client";

import SemesterContext from "@/contexts/SemesterContext";
import usePersistentState from "@/hooks/usePersistentState";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
	const [semester, setSemester] = usePersistentState<Semester | undefined>(
		"semester",
		undefined
	);

	return (
		<NextUIProvider>
			<NextThemesProvider attribute="class" defaultTheme="dark">
				<SemesterContext.Provider
					value={{ semester, setSemester: (data) => setSemester(data) }}
				>
					{children}
				</SemesterContext.Provider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}
