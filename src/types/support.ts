export interface ISupportTicket {
  _id: string;
  reason: string;
  description: string;
  user: ISupportUser;
  images: string[];
  docs: string[];
  status: "pending" | "resolved" | string;
  createdAt: string;
  updatedAt: string;
  supportId: string;
  __v: number;
  reply: string;
}

export interface ISupportUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
}
