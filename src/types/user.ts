/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
  _id: string;
  name: string;
  role: "ADMIN" | "SUPER_ADMIN" | "EMPLOYEE" | "RECRUITER" | string;
  email: string;
  image: string;
  status: "active" | "inactive" | string;
  verified: boolean;
  isSocialLogin: boolean;
  skills: string[];
  educations: any[];
  workExperiences: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  address: string;
  date_of_birth: string;
  designation: string;
  gender: "Male" | "Female" | "Other" | string;
  language: string;
  linkedin: string;
  nationality: string;
  phone: string;
  subscription: string;
  bio: string;
}
