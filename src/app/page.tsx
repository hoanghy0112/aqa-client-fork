import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import Providers from "./providers";

export default function Home() {
	return (
		<main className="flex h-screen flex-row items-center justify-between p-24">
			<Providers>
				<p>Hello</p>
			</Providers>
		</main>
	);
}
