"use client";

import { Button, ButtonGroup } from "@nextui-org/react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	const [mounted, setMounted] = useState<Boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		mounted && (
			<div>
				<p> The current theme is: {theme}</p>
				<ButtonGroup>
					<Button
						onPress={() => {
							console.log("aaaaaaaa");
							console.log({ theme });
							setTheme("light");
						}}
					>
						Light Mode
					</Button>
					<Button onPress={() => setTheme("dark")}>Dark Mode</Button>
				</ButtonGroup>
			</div>
		)
	);
}
