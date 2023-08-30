import React, { ReactNode, useRef } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
	ChartData,
	TooltipPositionerFunction,
	ChartType,
	ChartDataset,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

declare module "chart.js" {
	interface TooltipPositionerMap {
		center: TooltipPositionerFunction<ChartType>;
	}
}

Tooltip.positioners.center = function (items, eventPosition) {
	//@ts-ignore
	const pos = Tooltip.positioners.average(items, eventPosition);
	if (pos === false) {
		return false;
	}
	const chart = this.chart;

	const { bottom, top } = chart.chartArea;

	return {
		x: pos.x,
		y: (bottom + top) / 2,
	};
};

type IData = {
	x: string;
	y: number;
	id?: string;
	tooltipTitle?: string;
};

export function BarChart({
	className,
	data,
	noDataText,
	valueFormatter = (d: number) => d,
	onClick,
}: {
	className?: React.ComponentProps<"div">["className"];
	data?: {
		label: string;
		data: IData[];
		backgroundColor?: string;
		sort?: "asc" | "desc";
	}[];
	noDataText: ReactNode;
	valueFormatter?: (d: number) => string | number;
	onClick?: (d: IClickData) => any;
}) {
	const ref = useRef<any>();

	const options: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: "index" as const,
			intersect: false,
		},
		scales: {
			x: {
				border: {
					display: false,
				},
				grid: {
					display: false,
				},
				beginAtZero: false,
			},
			y: {
				border: {
					display: false,
				},
				grid: {
					display: false,
				},
				beginAtZero: false,
			},
		},
		plugins: {
			legend: {
				display: false,
				position: "top" as const,
			},
			title: {
				display: false,
				text: "Chart.js Bar Chart",
			},
			tooltip: {
				position: "center",
				caretSize: 0,
				titleFont: {
					size: 15,
					family: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
				},
				bodyFont: {
					size: 14,
					family: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
					weight: "normal",
				},
				callbacks: {
					label: function (context) {
						let label = context.dataset.label || "";

						if (label) {
							label += ": ";
						}
						if (context.parsed.y !== null) {
							label += valueFormatter(context.parsed.y);
						}
						return label;
					},
					title(tooltipItems) {
						return (
							//@ts-ignore
							tooltipItems.at(0)?.raw?.tooltipTitle ||
							//@ts-ignore
							tooltipItems.at(0)?.raw.x
						);
					},
				},
			},
		},
	};

	const chartData: ChartData<"bar", IData[], string> = {
		// labels,
		datasets: (data || []).map(({ label, data, backgroundColor, sort }) => ({
			label: label || "No label",
			data: sort
				? data.sort((a, b) => (sort === "asc" ? a.y - b.y : b.y - a.y))
				: data,
			backgroundColor: backgroundColor || "#0ea5e9",
		})) as ChartDataset<"bar", IData[]>[],
	};

	return (
		<div className={`pl-5 w-full h-full flex items-center ${className || ""}`}>
			{data ? (
				<Bar
					ref={ref}
					//@ts-ignore
					options={options}
					data={chartData}
					onClick={(event) => {
						const eventList = getElementAtEvent(ref.current, event);
						if (eventList.length > 0) {
							const index = eventList[0].index;
							const clickData = chartData.datasets.map((d) =>
								d.data.at(index)
							);
							onClick?.({
								index,
								data: clickData,
							});
						}
					}}
				/>
			) : (
				noDataText
			)}
		</div>
	);
}

interface IClickData {
	index: number;
	data: (IData | undefined)[];
}
