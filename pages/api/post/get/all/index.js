import db from '@/libs/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }
  try {
    const { limit, offset } = req.query;
    const result = await db.getAllPostsForExplore(limit, offset);
    res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
    });
  }
}
