"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const client = new ApolloClient({
		uri: "http://localhost:3000/graphql",
		cache: new InMemoryCache(),
	});

	useEffect(() => {}, [pathname, searchParams]);

	return (
		<NextUIProvider>
			<NextThemesProvider attribute="class" defaultTheme="dark">
				<QueryClientProvider client={queryClient}>
					<ApolloProvider client={client}>{children}</ApolloProvider>
				</QueryClientProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}
