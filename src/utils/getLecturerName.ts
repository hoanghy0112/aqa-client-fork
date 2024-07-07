import { useAuth } from "@/stores/auth.store";

export default function getLecturerName(lecturer: {
	lecturer_id?: string | null;
	display_name?: string | null;
}) {
	const { authData } = useAuth.getState();

	if (authData?.user.role) {
		const { role } = authData.user;

		if (role === "ADMIN") {
			return lecturer.display_name;
		} else {
			return lecturer.lecturer_id;
		}
	}

	return lecturer.lecturer_id;
}
