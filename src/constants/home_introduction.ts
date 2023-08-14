export const HOME_INTRODUCTION: IFeatureIntroduction[] = [
	{
		title: {
			displayName: "Môn học",
			link: "/subject",
		},
		description: "Khảo sát dựa vào điểm đánh giá trung bình của các môn học ",
		navigation_links: [
			{
				displayName: "Tìm kiếm môn học",
				link: "/subject/find",
			},
			{
				displayName: "Xem bảng xếp hạng các môn học",
				link: "/subject/rank",
			},
		],
	},
	{
		title: {
			displayName: "Bình luận",
			link: "/comment",
		},
		description: "Thống kê bình luận của sinh viên",
		navigation_links: [],
	},
	{
		title: {
			displayName: "Tiêu chí",
			link: "/criteria",
		},
		description: "Thống kê điểm đánh giá theo từng tiêu chí",
		navigation_links: [
			{
				displayName: "Xem bảng xếp hạng các môn học",
				link: "/subject/rank",
			},
		],
	},
];

export interface IFeatureIntroduction {
	title: {
		displayName: string;
		link: string;
	};
	description: string;
	navigation_links: {
		displayName: string;
		link: string;
	}[];
}
