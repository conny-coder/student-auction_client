import { getCategoriesUrl } from "@/config/api.config";
import axios from "@/api/interceptors";
import {ICategory} from "@/types/category.types";

export const CategoryService = {
  async getAll() {
    return axios.get<ICategory[]>(getCategoriesUrl(""));
  },
};
