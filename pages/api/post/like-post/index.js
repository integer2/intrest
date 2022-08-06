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
    await db.likePost(user_id, post_id);
    res.status(200).json({
      message: "Post liked",
    })
  } catch (error) {}
}
