export type UserProfile = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isVerified: boolean;
  role: 'personal' | 'agency';
  googleId: string | null;
  profilePicture: string | null;
  images: string[];
  age: number | null;
  location: string | null;
  gender: 'male' | 'female' | 'other' | null;
  socialMediaLinks: string[];
  eyeColor: string | null;
  height: string | null;
  hairColor: string | null;
  bust: number | null;
  waist: number | null;
  hips: number | null;
  dressSize: string | null;
  shoes: string | null;
  coverLetter: string | null;
  profileViews: number;
  isPremium: boolean | null;
  accountType: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfileData = {
  firstName?: string | null;
  lastName?: string | null;
  age?: number | null;
  location?: string | null;
  gender?: 'male' | 'female' | 'other' | null;
  eyeColor?: string | null;
  height?: string | null;
  hairColor?: string | null;
  bust?: number | null;
  waist?: number | null;
  hips?: number | null;
  dressSize?: string | null;
  shoes?: string | null;
  coverLetter?: string | null;
  socialMediaLinks?: string[];
  images?: string[];
  profilePicture?: string | null;
};


export type PhotoSlot = {
    existingUrl: string | null;
    preview: string | null;
    file: File | null;
};

export type PersonalFormData = {
    firstName: string;
    lastName: string;
    age: string;
    location: string;
    gender: string;
};

export type PhysicalFormData = {
    eyeColor: string;
    hairColor: string;
    height: string;
    bust: string;
    waist: string;
    hips: string;
    dressSize: string;
    shoes: string;
};

export type PortfolioFormData = {
    coverLetter: string;
    socialLinks: { url: string }[];
};

export type Tab = "info" | "physical" | "portfolio";