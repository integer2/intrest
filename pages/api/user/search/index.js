import db from "@/libs/db";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  try {
    const { query } = req.query;

    const [result] = await db.searchUserByUsernameOrName(query);

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
    });
  }
}