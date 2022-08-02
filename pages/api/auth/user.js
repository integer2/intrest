import db from '@/libs/db';
import authorization from '@/middlewares/authorization';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({
      message: 'Method not allowed',
    });

  const { id: user_id, email } = await authorization(req, res);

  const result = await db.getUser(user_id, email);

  res.status(200).json({
    ...result,
  });
}
