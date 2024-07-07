import { AuthDto } from "@/gql/graphql";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type IAuth = {
	isLogin?: boolean;
	authData: AuthDto | null;
	authLogin: (authEntity: AuthDto) => any;
	authLogout: () => any;
};

export const useAuth = create<
	IAuth,
	[["zustand/persist", never], ["zustand/immer", never]]
>(
	persist(
		immer<IAuth>((set, get) => ({
			authData: null,
			authLogin(authEntity) {
				set((state) => {
					state.isLogin = true;
					state.authData = authEntity;
				});
			},
			authLogout() {
				set((state) => {
					state.isLogin = false;
					state.authData = null;
				});
			},
		})),
		{
			name: "auth",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
