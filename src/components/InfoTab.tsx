"use client";

import useNavigate from "@/hooks/useNavigate";
import { Card } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function InfoTab({
	icon,
	title,
	type,
	number,
	isLoading,
}: {
	icon: string;
	title: string;
	type: string;
	number?: number;
	isLoading: boolean;
	defaultChecked?: boolean;
}) {
	const navigate = useNavigate();
	const searchParams = useSearchParams();

	return (
		<Card radius="none" shadow="none" isPressable>
			<label
				htmlFor={title}
				className="w-fit hover:bg-slate-200 dark:hover:bg-slate-700 hover:cursor-pointer transition-all rounded-md pt-2"
				onClick={() => {
					navigate.push({ type });
				}}
			>
				<input
					id={title}
					name="comment_tab"
					className="peer hidden"
					type="radio"
					checked={
						searchParams.get("type") === type ||
						(type === "all" && !searchParams.has("type"))
					}
					onChange={() => {}}
				/>
				<div className="flex flex-row items-start gap-2 px-6">
					<Image src={icon} width={15} height={15} alt="icon" />
					<p className="text-sm font-medium text-gray-500 dark:text-gray-300">
						{title}
					</p>
				</div>
				{number === undefined ? (
					<Spinner className="mt-2 w-fit" />
				) : (
					<p className="text-2xl font-semibold pl-6 mt-2 w-fit">
						{number || 0}
					</p>
				)}
				<div className="w-full h-1 mt-1 bg-transparent peer-checked:bg-sky-900 transition-all" />
			</label>
		</Card>
	);
}
