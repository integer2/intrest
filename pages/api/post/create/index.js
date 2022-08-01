import { authorization } from 'middlewares';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });
  const auth = await authorization(req, res);

  console.log(auth);

  return res.status(200).json({ message: 'Create Post' });
}
