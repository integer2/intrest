import db from '@/libs/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }
  try {
    const { follower_id, user_id } = req.body;
    const [result] = await db.checkIsFollowed(follower_id, user_id);
    res.status(200).json({
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
