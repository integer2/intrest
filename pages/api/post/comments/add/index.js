import db from '@/libs/db';
import authorization from '@/middlewares/authorization';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }
  try {
    const auth = await authorization(req, res);
    const { id: user_id } = auth;
    const { post_id, comment } = req.body;
    await db.addComments(post_id, user_id, comment);
    return res.status(200).json({ message: 'Comment added' });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
