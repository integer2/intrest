import db from '@/libs/db';
import formidable from 'formidable';
import { authorization } from 'middlewares';
import { deleteFile, moveFile } from '@/utils/file-manager';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST')
      return res.status(405).json({ error: 'Method not allowed' });
    const auth = await authorization(req, res);

    const { id: author_id } = auth;
    const { fields, files } = await getDataForm(req);

    const newPath = await moveFile(files.image);
    const img_url = `/uploads/images/${newPath.split('/').pop()}`;

    await db
      .query('CALL createPost(?, ?, ?)', [author_id, img_url, fields.desc])
      .catch((err) => {
        deleteFile(newPath);
        throw err;
      });

    return res.status(200).json({ message: 'Create post successful' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

function getDataForm(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
