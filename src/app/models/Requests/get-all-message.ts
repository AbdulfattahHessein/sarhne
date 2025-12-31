export type MessagesQueryParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
  type?: MessagesType;
  isFav?: boolean;
};

export type MessagesType = 'All' | 'Sent' | 'Received' | 'fav';

export interface Message {
  id: string;
  content: string;
  isFav: boolean;
  senderName: string;
  senderId?: string;
  SendAnonymously: boolean;
  isPublic: boolean;
  date: string;
}
