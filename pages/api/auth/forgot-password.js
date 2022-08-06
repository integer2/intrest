import db from '@/libs/db';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }
  try {
    const { email } = req.body;
    const [data] = await db.getUserByEmail(email);

    if (!data) {
      return res.status(400).json({
        error: 'Email not found',
      });
    }

    const token = jwt.sign(
      {
        id: data.id,
        email: data.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '10m',
      }
    );

    res.status(200).json({
      message: 'Login successful',
      recovery_token: token,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
