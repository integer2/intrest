import authorization from '@/middlewares/authorization';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }
  const { token } = await authorization(req, res);
  res.send({ token });
}
