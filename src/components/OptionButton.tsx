"use client";

import { ReactNode } from "react";
import { Button, ButtonProps } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { ButtonVariantProps } from "@nextui-org/react";

type Props = {
	children?: ReactNode;
	className?: React.ComponentProps<"button">["className"];
	onPress?: (e: any) => any;
	hasValue?: boolean;
	tooltip?: ReactNode;
};

export default function OptionButton({
	children,
	className,
	onPress,
	hasValue = false,
	tooltip,
	...props
}: Props & ButtonProps) {
	return (
		<Tooltip
			isDisabled={!Boolean(tooltip)}
			content={<p className=" max-w-md h-auto">{tooltip}</p>}
		>
			<Button
				onPress={onPress}
				variant={hasValue ? "shadow" : "ghost"}
				color={hasValue ? "primary" : "default"}
				className={`${className} ${hasValue ? "" : "bg-white"}`}
				{...props}
			>
				{children}
			</Button>
		</Tooltip>
	);
}
