import { IUserState } from "./user.types";

export interface IReview {
  _id: string;
  userId: string;
  author: IUserState;
  rating: number;
  comment: string;
  createdAt: string;
}