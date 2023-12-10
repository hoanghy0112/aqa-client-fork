"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {}, [pathname, searchParams]);

	return (
		<NextUIProvider>
			<NextThemesProvider attribute="class" defaultTheme="dark">
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}
