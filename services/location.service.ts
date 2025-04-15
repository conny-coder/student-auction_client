import { getCategoriesUrl, getLocationsUrl } from "@/config/api.config";
import axios from "@/api/interceptors";
import { ILocation } from "@/types/location.types";

export const LocationService = {
  async getAll() {
    return axios.get<ILocation[]>(getLocationsUrl(""));
  },
};
