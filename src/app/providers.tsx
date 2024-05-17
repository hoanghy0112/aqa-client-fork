"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { persistCache } from "apollo-cache-persist";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { API_URL_V2 } from "@/constants/api_endpoint";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [cache, setCache] = useState(new InMemoryCache());

	const client = new ApolloClient({
		uri: API_URL_V2,
		cache,
	});

	useEffect(() => {}, [pathname, searchParams]);

	useEffect(() => {
		(async () => {
			await persistCache({
				cache,
				//@ts-ignore
				storage: localStorage,
			});
		})();
	}, []);

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
