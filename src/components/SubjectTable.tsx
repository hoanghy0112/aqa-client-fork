"use client";
import SemesterContext from "@/contexts/SemesterContext";
import { Button, Card, Input } from "@nextui-org/react";
import { useContext, useRef, useState } from "react";
import SemesterSelector from "./SemesterSelector/SemesterSelector";
import SubjectList from "./SubjectList";

export default function SubjectTable() {
	const { semester } = useContext(SemesterContext);

	const keyword = useRef<string>("");
	const [searchQuery, setSearchQuery] = useState<string>("");

	function handleSearch() {
		setSearchQuery(keyword.current);
	}

	return (
		<div>
			<div className="flex flex-row items-center mt-12 gap-5">
				<Card className=" w-fit" shadow="md">
					<Input
						onChange={(e) => (keyword.current = e.target.value)}
						onClear={() => {
							keyword.current = "";
							handleSearch();
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
					onPress={handleSearch}
					className=""
					variant="shadow"
					color="primary"
					size="md"
				>
					<p className=" font-medium">Tìm kiếm</p>
				</Button>
				<SemesterSelector />
			</div>
			<SubjectList semester={semester} keyword={searchQuery} />
		</div>
	);
}
