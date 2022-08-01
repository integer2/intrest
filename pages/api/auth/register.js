import db from '@/libs/db';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({
        error: 'Method not allowed',
      });
    }

    const { username, email, password } = req.body;

    const result = await db.query(`CALL createNewUser(?, ?, ?)`, [
      username,
      email,
      password,
    ]);

    res.status(200).json({ message: 'Register successfull' });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
