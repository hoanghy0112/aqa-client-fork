"use client";

import { CommentContext } from "@/app/comment/provider";
import { Button, Card, Input, Spinner } from "@nextui-org/react";
import { useContext, useRef, useState } from "react";

export default function CommentSearchBar() {
	const { keyword, setKeyword, isLoading, setIsLoading } =
		useContext(CommentContext);
	const [searchText, setSearchText] = useState("");

	return (
		<div className="flex flex-row items-center mt-12 gap-5">
			<Card className=" w-fit" shadow="md">
				<Input
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					onClear={() => {
						setSearchText("");
						setKeyword("");
					}}
					isClearable
					type="text"
					size="lg"
					placeholder="Nhập từ khóa cần tìm..."
					variant="bordered"
					className="w-[500px]"
				/>
			</Card>
			<Button
				onPress={() => {
					if (searchText == "" || isLoading) return;
					setKeyword(searchText);
					setIsLoading(true);
				}}
				className=""
				variant="shadow"
				color="primary"
				size="lg"
			>
				{isLoading ? (
					<Spinner color="default" />
				) : (
					<p className=" font-medium">Tìm kiếm</p>
				)}
			</Button>
		</div>
	);
}
