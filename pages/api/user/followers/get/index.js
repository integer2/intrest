import db from '@/libs/db';
import authorization from '@/middlewares/authorization';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }
  try {
    const { id: user_id } = req.body;
    const result = await db.getFollowersData(user_id);
    return res.status(200).json({ followers: result });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
