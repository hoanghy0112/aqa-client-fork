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
		<div className=" py-6 flex flex-col items-start gap-4">
			<Button
				variant={"shadow"}
				color={"primary"}
				onClick={() =>
					items.find((v) => v.value === "all")?.onClick?.("all")
				}
			>
				<p className=" text-start font-semibold">
					{items.find((v) => v.value === "all")?.display_name}
				</p>
			</Button>
			{[...items]
				.sort((a, b) =>
					isSort ? (a.display_name < b.display_name ? -1 : 1) : 0
				)
				.filter((v) => v.value !== "all")
				.map(({ display_name, value, onClick }) => (
					<>
						<Button
							variant={"ghost"}
							color={"default"}
							onClick={() => onClick(value)}
						>
							<p className=" text-start font-semibold">
								{display_name}
							</p>
						</Button>
					</>
				))}
		</div>
	);
}
