"use client";

import { Button, ButtonGroup } from "@nextui-org/react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	const [mounted, setMounted] = useState<Boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		mounted && (
			<div className="absolute right-5 top-3">
				<DarkModeToggle
					mode={theme as Mode}
					dark="Dark mode"
					light=""
					size="sm"
					inactiveTrackColor="#e2e8f0"
					inactiveTrackColorOnHover="#f8fafc"
					inactiveTrackColorOnActive="#cbd5e1"
					activeTrackColor="#334155"
					activeTrackColorOnHover="#1e293b"
					activeTrackColorOnActive="#0f172a"
					inactiveThumbColor="#1e293b"
					activeThumbColor="#e2e8f0"
					onChange={(mode) => {
						setTheme(mode);
					}}
				/>
			</div>
		)
	);
}
