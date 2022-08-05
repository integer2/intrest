import db from '@/libs/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }

  try {
    const { post_id } = req.body;

    const result = await db.getPost(post_id);

    res.status(200).json({
      ...result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
    });
  }
}
