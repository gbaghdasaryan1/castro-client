import type { NextApiRequest, NextApiResponse } from 'next';
import { axiosInstance } from '@config/axios';

type ResponseData = {
  accessToken?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ error: 'Credential is required' });
  }

  try {
    const response = await axiosInstance.post('/auth/google', {
      idToken: credential,
    });

    return res.status(200).json({ accessToken: response.data.accessToken });
  } catch (error: unknown) {
    const axiosError = error as { response?: { status?: number; data?: { message?: string } }; message?: string };
    const message = axiosError.response?.data?.message ?? axiosError.message ?? 'Google authentication failed';
    return res.status(axiosError.response?.status || 500).json({ error: message });
  }
}
