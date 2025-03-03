import { IUser } from "./user.types";

export interface IAuthResponse extends ITokens {
  user: IUser;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
