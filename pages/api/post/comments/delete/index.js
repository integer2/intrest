import db from '@/libs/db';
import authorization from '@/middlewares/authorization';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }
  try {
    await authorization(req, res);
    const { comment_id } = req.body;
    await db.deleteComments(comment_id);
    return res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
