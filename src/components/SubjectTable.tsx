"use client";
import { GET_SUBJECT_TABLE } from "@/constants/api_endpoint";
import withQuery from "@/utils/withQuery";
import { Button, Card, Input, Spinner } from "@nextui-org/react";
import { useContext, useRef, useState } from "react";
import useSWR from "swr";
import SemesterSelector from "./SemesterSelector/SemesterSelector";
import { defaultFetcher } from "@/utils/fetchers";
import SubjectList from "./SubjectList";
import SemesterContext from "@/contexts/SemesterContext";

export default function SubjectTable() {
	const { semester } = useContext(SemesterContext);

	const keyword = useRef<string>("");
	const [searchQuery, setSearchQuery] = useState<string>("");

	const { data, isLoading } = useSWR(
		withQuery(GET_SUBJECT_TABLE, {
			keyword: searchQuery,
		}),
		defaultFetcher
	);

	console.log({ data });

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
					{isLoading ? (
						<Spinner color="default" />
					) : (
						<p className=" font-medium">Tìm kiếm</p>
					)}
				</Button>
				<SemesterSelector />
			</div>
			<SubjectList semester={semester} keyword={searchQuery} />
		</div>
	);
}
