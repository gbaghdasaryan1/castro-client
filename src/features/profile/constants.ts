import { Tab, UserProfile } from "./types";

export const MAX_PHOTOS = 3;

export const TABS: { id: Tab; label: string; onlyFor?: UserProfile["role"] }[] = [
  { id: "info", label: "Personal Info" },
  { id: "physical", label: "Physical Stats", onlyFor: "personal" },
  { id: "portfolio", label: "Portfolio" },
];
