export interface IMessage {
  _id: string
  senderId: string
  chatId: string
  type: "text" | "file"
  text?: string
  fileUrl?: string
  createdAt: string
}