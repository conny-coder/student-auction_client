import {  getReviewsUrl } from "@/config/api.config";
import axios from "@/api/interceptors";
import { IReview } from "@/types/review.types";

export const ReviewService = {
  async getByUser(id: string) {
    return axios.get<IReview[]>(getReviewsUrl(`/${id}`));
  },
};
