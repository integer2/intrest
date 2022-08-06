import db from '@/libs/db';
import authorization from '@/middlewares/authorization';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }

  try {
    const { id, email } = await authorization(req, res);
    const { newPassword } = req.body;
    await db.updateForgottenPassword(id, email, newPassword);
    res.json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
}
