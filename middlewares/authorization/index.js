import jwt from 'jsonwebtoken';

export default function authorization(req, res) {
  return new Promise((resolve, reject) => {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).json({ message: 'Unauthorized' });

    const authSplit = authorization.split(' ');

    const [authType, authToken] = [authSplit[0], authSplit[1]];

    if (authType !== 'Bearer')
      return res.status(401).json({ message: 'Unauthorized' });

    return jwt.verify(authToken, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      return resolve({ ...decode, token: authToken });
    });
  });
}
