export interface IAdvertisement {
  _id: string;
  cover_image: string;
  organization_name: string;
  service_type: string;
  focus_area: string;
  mode: "online" | "offline" | "hybrid" | string;
  location: string;
  pricing: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  contact_info: IContactInfo;
  status: "pending" | "approved" | "rejected" | string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IContactInfo {
  type: "email" | "phone" | "website" | string;
  details: string;
}
