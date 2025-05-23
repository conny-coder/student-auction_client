import { ILocation } from "./location.types";

export interface IAuction {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  ownerId: string;
  startPrice: number;
  highestBidderId: string | null;
  endTime: string;
  status: "active" | "completed";
  step: number;
  condition: "new" | "used";
  currentBid: number;
  isFavourite: boolean;
  location: ILocation;
}

export interface IAuctionForm {
  title: string;
  description: string;
  images: string[];
  category: string;
  startPrice: number;
  endTime: number;
  condition: "new" | "used";
  location: string;
}

export interface IFavouriteAuction {
  _id: string;
  userId: string;
  auction: IAuction;
}
