import db from '@/libs/db';
import authorization from '@/middlewares/authorization';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  try {
    const { id } = await authorization(req, res);

    const result = await db.getAllNotFollowed(id);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
    });
  }
}
