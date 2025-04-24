import { IAuction } from "./auction.types";

export interface INotification {
  _id: string;
  userId: string;
  type: "auction_lost" | "auction_won" | "auction_ended_no_buyer" | "auction_ended";
  createdAt: string;
  isRead: boolean;
  auction: IAuction;
}