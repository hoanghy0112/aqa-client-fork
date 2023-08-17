import { Spinner } from "@nextui-org/react";

export default function Loading() {
	return (
		<div className=" flex flex-row items-center gap-4">
			<Spinner size="sm" />
			<p className=" text-medium font-medium">Đang tải</p>
		</div>
	);
}
