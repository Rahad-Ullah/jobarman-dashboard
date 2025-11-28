export interface IJobPost {
  _id: string;
  thumbnail: string;
  recruiter: IRecruiter;
  title: string;
  description: string;
  status: "active" | "inactive" | "paused" | string;
  category: string;
  job_type: "FULL_TIME" | "PART_TIME" | "REMOTE" | "CONTRACT" | string;
  job_level: "ENTRY_LEVEL" | "MID_LEVEL" | "SENIOR_LEVEL" | string;
  experience_level: string;
  min_salary: number;
  max_salary: number;
  location: string;
  required_skills: string[];
  deadline: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IRecruiter {
  _id: string;
  name: string;
  email: string;
  image: string;
}
