export interface ICategory {
  _id: number;
  name: string;
  image: string;
  status: "active" | "inactive" | string;
}
