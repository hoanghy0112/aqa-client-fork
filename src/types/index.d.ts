declare type Semester = {
	semester_name: string;
	semester_id: string;
};

declare type IComment = {
	content: string;
	type: "positive" | "negative";
	comment_id: string;
	teach_id: string;
};

declare type Criteria = {
	criteria_id: string;
	display_name: string;
	index: number;
};

declare type Subject = {
	average_point: number;
	faculty_id: string;
	faculty_name: string;
	subject_id: string;
	subject_name: string;
};

declare type Faculty = {
	faculty_id: string;
	faculty_name: string;
};

declare type IClass = {
	class_id: string;
	class_name: string;
	total: number;
	attend: number;
	semester_id: string;
	semester_name: string;
	point: number;
};

declare type ISortOptions = "asc" | "desc" | undefined;
