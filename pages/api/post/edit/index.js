import db from '@/libs/db';
import authorization from '@/middlewares/authorization';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }

  try {
    await authorization(req, res);

    const { id, desc } = req.body;

    await db.updatePost(id, desc);

    return res.status(200).json({
      message: 'Update post successful',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
