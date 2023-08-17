"use client";

import ChartLayout from "./ChartLayout";

export default function CriteriaChart({
	criteria: { criteria_id, display_name, index },
}: {
	criteria: Criteria;
}) {
	return (
		<div>
			<h1>{`Tiêu chí ${index}`}</h1>
			<p>{display_name}</p>
			<div className=" h-[400px]">
				{/* <ChartLayout primaryTitle="" secondaryTitle=""
                ></ChartLayout> */}
			</div>
		</div>
	);
}
