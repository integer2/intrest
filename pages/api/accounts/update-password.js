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
    const { oldPassword, newPassword } = req.body;
    await db.updateOldPassword(user_id, oldPassword, newPassword);
    return res.status(200).json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
}
