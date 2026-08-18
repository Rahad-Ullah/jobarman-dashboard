"use server";

import { cookies } from "next/headers";

const getProfile = async (token?: string) => {
  if (!token) token = (await cookies()).get("accessToken")?.value || '';

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
    next: {
      tags: ["profile"],
    },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const { data } = await res?.json();
  return data;
};

export default getProfile;
