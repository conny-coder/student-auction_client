import { getProfilesUrl } from "@/config/api.config";
import axios from "@/api/interceptors";
import { IProfile } from "@/types/user.types";

export const ProfileService = {
  async getById(id: string) {
    return axios.get<IProfile>(getProfilesUrl(`/${id}`));
  },
};
