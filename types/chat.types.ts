import { IMessage } from "./message.types";
import { IProfile } from "./user.types";

export interface IChat {
  chatId: string;
  otherUser: IProfile | null;
  lastMessage: IMessage | null;
  updatedAt: string;
}

export interface ISingleChat {
  chat: IChat;
  messages: IMessage[];
}