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

export type AuthTokenResponse = {
  accessToken: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export type ForgotPasswordBody = {
  email: string;
}

export type ResetPasswordResponse = {
  message: string;
};

export type ResetPasswordRequestData = {
  email: string;
  newPassword: string;
  code: string;
};

export type Role = "personal" | "agency";