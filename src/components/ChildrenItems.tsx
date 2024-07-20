import { Button } from "@nextui-org/react";

type Props = {
	items: {
		display_name: string;
		value: string;
		onClick: (value: string) => any;
	}[];
	isSort?: boolean;
};

export default function ChildrenItems({ items, isSort = true }: Props) {
	return (
		<div className=" flex-1 py-6 flex flex-col items-start gap-4">
			<Button
				variant={"shadow"}
				color={"primary"}
				onClick={() =>
					items.find((v) => v.value === "all")?.onClick?.("all")
				}
				className=" w-full"
			>
				<p className=" text-start font-semibold">
					{items.find((v) => v.value === "all")?.display_name}
				</p>
			</Button>
			<div className=" border-1 border-foreground-300 w-full flex flex-col rounded-xl overflow-hidden">
				{[...items]
					.sort((a, b) =>
						isSort ? (a.display_name < b.display_name ? -1 : 1) : 0
					)
					.filter((v) => v.value !== "all")
					.map(({ display_name, value, onClick }, index) => (
						<div
							key={display_name}
							className="px-4 py-3 border-b-1 border-foreground-300 bg-background cursor-pointer hover:bg-foreground-100 duration-200 active:bg-foreground-200"
							onClick={() => onClick(value)}
						>
							<p className=" text-start font-semibold">
								{`${display_name}`}
							</p>
						</div>
					))}
			</div>
		</div>
	);
}
