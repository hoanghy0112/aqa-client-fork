import { Button } from "@nextui-org/react";

type Props = {
	items: {
		display_name: string;
		value: string;
		onClick: (value: string) => any;
	}[];
};

export default function ChildrenItems({ items }: Props) {
	return (
		<div className=" py-6 flex flex-col items-start gap-4">
			{items.map(({ display_name, value, onClick }) => (
				<>
					<Button
						variant={value === "all" ? "shadow" : "light"}
						color={value === "all" ? "primary" : "default"}
						onClick={() => onClick(value)}
					>
						<p className=" text-start">{display_name}</p>
					</Button>
				</>
			))}
		</div>
	);
}
