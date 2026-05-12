import { axiosInstance } from "@config/axios";
import { UpdateProfileData, UserProfile } from "./types";

export const getProfile = (): Promise<UserProfile> =>
  axiosInstance.get<UserProfile>("/users/me");

export const updateProfile = (data: UpdateProfileData): Promise<UserProfile> =>
  axiosInstance.patch<UserProfile, UpdateProfileData>("/users/me", data);

export const uploadImage = async (file: File): Promise<string> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api"}/upload`,
    {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }
  );
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? "Upload failed");
  }
  const data = (await response.json()) as { url: string };
  return data.url;
};
