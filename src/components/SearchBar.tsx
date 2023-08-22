"use client";

import { Input } from "@nextui-org/input";

export default function SearchBar() {
	return (
		<div className="w-[500px] rounded-xl shadow-xl absolute left-1/2 -translate-x-1/2 top-8">
			<Input
				isClearable
				type="text"
				size="lg"
				placeholder="Tìm kiếm chức năng..."
			/>
		</div>
	);
}
