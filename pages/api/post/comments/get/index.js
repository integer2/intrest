import db from '@/libs/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }
  try {
    const { post_id } = req.body;
    const result = await db.getComments(post_id);
    return res.status(200).json({ comments: result });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
