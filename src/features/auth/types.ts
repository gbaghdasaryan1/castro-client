// Requests
export type LoginFormData = {
  email: string;
  password: string;
};

export type RegistrationFormData = {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
};

export type VerifyOTPData = {
  code: string;
  email: string;
};

// Responses
export type AuthTokenResponse = {
  accessToken: string;
};

export type Role = "personal" | "agency";