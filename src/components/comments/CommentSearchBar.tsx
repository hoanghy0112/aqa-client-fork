"use client";

import { useFilter } from "@/contexts/FilterContext";
import useNavigate from "@/hooks/useNavigate";
import { Button, Card, Input, Spinner } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export default function CommentSearchBar() {
	const navigate = useNavigate();

	const searchParams = useSearchParams();

	const { isLoading, setIsLoading } = useFilter();
	const [searchText, setSearchText] = useState(searchParams.get("keyword") || "");

	const keyword = useMemo(() => searchParams.get("keyword") || "", [searchParams]);

	const setKeyword = useCallback(
		(newKeyword: string) => navigate.replace({ keyword: newKeyword }),
		[navigate]
	);

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
					size="md"
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
				size="md"
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
