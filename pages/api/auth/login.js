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

    const result = await db.query(`CALL loginUser(?, ?)`, [email, password]);

    const data = result[0][0][0];

    const token = jwt.sign(
      {
        id: data.id,
        email: data.email,
      },
      'secret',
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
