export interface IReview {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  rating: number;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
