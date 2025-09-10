import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { question } = req.body;
  const { search } = req.body;
  if (!question) return res.status(400).json({ message: 'Question is required' });

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ask`
    , { question, search });
    const answer = response.data.answer;

    res.status(200).json({ answer });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
