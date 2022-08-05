import db from '@/libs/db';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({
        error: 'Method not allowed',
      });
    }

    const { email, password } = req.body;

    const data = await db.userLogin(email, password);

    const token = jwt.sign(
      {
        id: data.id,
        email: data.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
