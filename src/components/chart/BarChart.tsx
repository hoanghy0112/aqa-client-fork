import React from "react";
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
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

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

export const options: ChartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	interaction: {
		mode: "index" as const,
		intersect: false,
	},
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Chart.js Bar Chart",
		},
		tooltip: {
			position: "center",
			caretSize: 0,
			titleFont: {
				size: 15,
				family:
					"ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
				// weight: "medium",
			},
			bodyFont: {
				size: 14,
				family:
					"ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
				weight: "normal",
			},
		},
	},
};

const labels = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
];

export function BarChart<T>({
	className,
	data,
	title,
}: {
	className?: React.ComponentProps<"div">["className"];
	data: T[];
	title: string;
}) {
	const chartData: ChartData<"bar", number[], string> = {
		labels,
		datasets: [
			{
				label: "Dataset 1",
				data: labels.map(() => Math.random()),
				backgroundColor: "#0ea5e9",
			},
		],
	};

	return (
		<div className={className || ""}>
			<Bar options={options} data={chartData} />
		</div>
	);
}
