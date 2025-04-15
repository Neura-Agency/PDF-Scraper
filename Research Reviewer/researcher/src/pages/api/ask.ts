import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { askAgent } from '@/lib/crewAgent';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { question } = req.body;
  if (!question) return res.status(400).json({ message: 'Question is required' });

  try {
    // 1. Fetch your scraped data from your local backend
    const scrapedRes = await axios.get('http://127.0.0.1:8000/myagent');
    const scrapedData = scrapedRes.data;

    // 2. Pass it to CrewAI agent
    const answer = await askAgent(question, scrapedData);

    res.status(200).json({ answer });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
