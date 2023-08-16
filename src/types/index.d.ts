declare interface Semester {
	display_name: string;
	semester_id: string;
}

declare interface Comment {
	content: string;
	type: "positive" | "negative";
	comment_id: string;
	teach_id: string;
}

declare interface Criteria {
	criteria_id: string;
	display_name: string;
	index: number;
}

declare interface Subject {
	average_point: number;
	faculty_id: string;
	faculty_name: string;
	subject_id: string;
	subject_name: string;
}
