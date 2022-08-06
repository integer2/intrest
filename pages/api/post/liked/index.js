import db from '@/libs/db';
import authorization from '@/middlewares/authorization';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }
  try {
    const auth = await authorization(req, res);
    const { id: user_id } = auth;

    const { post_id } = req.body;

    if (!post_id || !user_id) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const [result] = await db.checkIsLiked(user_id, post_id);
    res.status(200).json({
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
