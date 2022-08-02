import db from '@/libs/db';
import { authorization, dataForm } from 'middlewares';
import { deleteFile, moveFile } from '@/utils/file-manager';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST')
      return res.status(405).json({ error: 'Method not allowed' });
      
    const auth = await authorization(req, res);
    const { fields, files } = await dataForm(req);
    const newPath = await moveFile(files.image);
    
    const { id: author_id } = auth;
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

export const config = {
  api: {
    bodyParser: false,
  },
};
