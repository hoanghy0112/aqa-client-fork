"use client";

import ChartLayout from "@/components/chart/ChartLayout";
import { FilterProvider, useFilter } from "@/contexts/FilterContext";
import {
	FilterArgs,
	GroupedPoint,
	usePointsWithGroupByLazyQuery,
} from "@/gql/graphql";
import { sortSemester } from "@/utils/sortSemester";
import Loading from "@components/Loading";
import NoData from "@components/NoData";
import { AreaChart, BarChart, LineChart } from "@tremor/react";
import { ReactNode, useEffect, useState } from "react";

type Props = {
	title?: string;
	groupEntity: string;
	selectors?: ReactNode;
	queries?: (FilterArgs & { name: string })[];
	xTitle?: string;
};

function InnerPointWithCompare({
	title = "So sánh điểm đánh giá",
	selectors = <></>,
	queries = [],
	xTitle = "Điểm",
	groupEntity,
}: Props) {
	const filter = useFilter();

	const [data, setData] = useState<
		(Record<string, number | string | null> & { display_name?: string })[]
	>([]);
	const [loading, setLoading] = useState(false);

	const variables: FilterArgs & { groupEntity: string } = {
		criteria_id: filter.criteria?.criteria_id,
		faculty_id: filter.faculty?.faculty_id,
		semester_id: filter.semester?.semester_id,
		subjects: Array.from(filter.subjects.values()).length
			? Array.from(filter.subjects.values()).map(
					(subject) => subject.subject_id
			  )
			: undefined,
		program: filter.program,
		groupEntity: "Semester",
	};

	const [fetchFunction] = usePointsWithGroupByLazyQuery();

	useEffect(() => {
		(async () => {
			setData([]);
			setLoading(true);
			await Promise.all(
				queries.map(async (query) => {
					const response = await fetchFunction({
						variables: {
							...query,
							...Object.fromEntries(
								Object.entries(variables).filter(
									([key, value]) => !!value
								)
							),
							groupEntity,
						},
						fetchPolicy: "network-only",
					});
					setData((prev) => {
						const data = response.data?.groupedPoints.data || [];
						if (prev.length === 0) {
							return data.map((value) => ({
								display_name: value?.display_name || "",
								[query.name]: (value.average_point || 0) * 4,
							}));
						} else {
							return prev.map((item) => ({
								...item,
								[query.name]:
									(data.find(
										(value) =>
											value.display_name === item.display_name
									)?.average_point || 0) * 4 || null,
							}));
						}
					});
					return response;
				})
			);
			setLoading(false);
		})();
	}, [JSON.stringify(queries), JSON.stringify(variables)]);

	const legends = Array.from(
		new Set(data.flatMap((value) => Object.keys(value))).values()
	).filter((v) => v !== "display_name");

	return (
		<div className=" h-[500px]">
			{legends?.length && data?.length ? (
				<ChartLayout
					primaryTitle={title}
					secondaryTitle={""}
					legends={legends}
					showLegend={false}
					colors={[
						"sky",
						"cyan",
						"indigo",
						"orange",
						"violet",
						"teal",
						"lime",
						"fuchsia",
						"emerald",
						"green",
						"indigo",
						"red",
						"stone",
						"yellow",
					]}
					columnNum={data.length || 0}
					columnSize={100}
					isFullWidth
					handlerButtons={selectors}
				>
					<LineChart
						className=" h-full mt-4"
						data={sortSemester(data)}
						index="display_name"
						categories={legends}
						curveType={"natural"}
						enableLegendSlider
						colors={[
							"sky",
							"yellow",
							"emerald",
							"orange",
							"violet",
							"teal",
							"lime",
							"fuchsia",
							"red",
							"red",
							"indigo",
							"red",
							"stone",
							"yellow",
						]}
						yAxisWidth={80}
						autoMinValue
						valueFormatter={(number: number) => {
							return `${number.toFixed(2)}`;
						}}
						onValueChange={() => {}}
						// onValueChange={(v) => {
						// 	const item = data.find(
						// 		(point) => point.display_name == v?.name
						// 	);
						// 	if (item) onClick?.(item);
						// }}
						showLegend
						//@ts-ignore
						noDataText={loading ? <Loading /> : <NoData />}
					/>
				</ChartLayout>
			) : null}
		</div>
	);
}

export default function PointWithCompare(props: Props) {
	return (
		<FilterProvider>
			<InnerPointWithCompare {...props} />
		</FilterProvider>
	);
}
