import { getUsersUrl } from "@/config/api.config";
import axios from "@/api/interceptors";
import { IUserState } from "@/types/user.types";
import { IProfileForm } from "@/components/screens/change-profile/ChangeProfile";

export const UserService = {
  async getById(id: string) {
    return axios.get<IUserState>(getUsersUrl(`/${id}`));
  },
  async getTopSellers() {
    return axios.get<Pick<IUserState, "name" | "avatar" | "_id">[]>(getUsersUrl("/top-sellers"));
  },
  async changePassword({ oldPassword, password }: { oldPassword: string; password: string }) {
    return axios.put<void>(getUsersUrl("/change-password"), { oldPassword, password });
  },
  async updateProfile(userId: string ,data: IProfileForm) {
    return axios.put<void>(getUsersUrl(`/${userId}`), data);
  },
};
