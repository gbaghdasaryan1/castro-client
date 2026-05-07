/* eslint-disable @typescript-eslint/no-explicit-any */
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
    // Send the Google ID token to your backend
    const response = await axiosInstance.post('/auth/google', {
      idToken: credential,
    });

    return res.status(200).json({
      accessToken: response.data.accessToken,
    });
  } catch (error: any) {
    console.error('Google callback error:', error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Google authentication failed',
    });
  }
}
