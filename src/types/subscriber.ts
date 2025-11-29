export interface ISubscriber {
  _id: string;
  name: string;
  price: number;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  txId: string;
  package: {
    _id: string;
    name: string;
    price: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
