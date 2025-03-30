export interface IUser {
  _id: string;
  email: string;
  userName: string;
  isAdmin: boolean;
}

export interface IProfile extends IUser {
  bidsCount: number;
  winnersCount: number;
  soldCount: number;
  rating: number;
  balance: number;
  name: string;
  avatar: string;
}
