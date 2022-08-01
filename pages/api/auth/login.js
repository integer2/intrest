import db from '@/libs/db';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({
        error: 'Method not allowed',
      });
    }

    const { email, password } = req.body;

    const result = await db.query(`CALL loginUser(?, ?)`, [
      email,
      password,
    ]);

    console.log(result[0]);

    res.status(200).json({
      message: 'Login successful',
      data: result[0],
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
