import ChartLayout from "@/components/chart/ChartLayout";
import { FilterProvider, useFilter } from "@/contexts/FilterContext";
import {
	FilterArgs,
	GroupedPoint,
	usePointsWithGroupByLazyQuery,
} from "@/gql/graphql";
import Loading from "@components/Loading";
import NoData from "@components/NoData";
import { BarChart } from "@tremor/react";
import { ReactNode, useEffect, useState } from "react";

type Props = {
	title: string;
	legend: string;
	selectors: ReactNode;
	query?: FilterArgs;
	xTitle?: string;
	groupEntity: string;
	onClick?: (item: GroupedPoint) => any;
};

function InnerPointWithGroupedEntity({
	title,
	legend,
	selectors,
	query = {},
	xTitle = "Điểm",
	groupEntity,
	onClick = () => {},
}: Props) {
	const filter = useFilter();

	const [data, setData] = useState<GroupedPoint[]>([]);
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
			setLoading(true);
			const response = await fetchFunction({
				variables: {
					...query,
					...Object.fromEntries(
						Object.entries(variables).filter(([key, value]) => !!value)
					),
					groupEntity: groupEntity,
				},
				fetchPolicy: "network-only",
			});
			setData(response.data?.groupedPoints.data || []);
			setLoading(false);
		})();
	}, [JSON.stringify(query), JSON.stringify(variables)]);

	return (
		<div className=" h-[400px]">
			<ChartLayout
				primaryTitle={title}
				secondaryTitle={""}
				legends={[legend]}
				colors={["sky"]}
				columnNum={data.length || 0}
				columnSize={100}
				isFullWidth
				handlerButtons={selectors}
			>
				<BarChart
					className=" h-full mt-4"
					data={
						[...data]
							.sort((a, b) => b.average_point - a.average_point)
							.map((point) => ({
								[xTitle]: point.average_point * 4,
								name: point.display_name,
							})) || []
					}
					index="name"
					categories={[xTitle]}
					colors={["sky"]}
					yAxisWidth={80}
					autoMinValue
					valueFormatter={(number: number) => {
						return `${number.toFixed(2)}`;
					}}
					onValueChange={(v) => {
						const item = data.find(
							(point) => point.display_name == v?.name
						);
						if (item) onClick?.(item);
					}}
					enableLegendSlider
					showLegend
					//@ts-ignore
					noDataText={loading ? <Loading /> : <NoData />}
				/>
			</ChartLayout>
		</div>
	);
}

export default function PointWithGroupedEntity(props: Props) {
	return (
		<FilterProvider>
			<InnerPointWithGroupedEntity {...props} />
		</FilterProvider>
	);
}
