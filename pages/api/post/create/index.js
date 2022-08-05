import db from '@/libs/db';
import { authorization, dataForm } from 'middlewares';
import { deleteFile, moveFile } from '@/utils/file-manager';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST')
      return res.status(405).json({ error: 'Method not allowed' });

    // Middlewares
    const auth = await authorization(req, res);
    const { fields, files } = await dataForm(req);

    console.log(fields);

    const newPath = await moveFile(files.file);

    const { id: author_id } = auth;
    const img_url = `/uploads/images/${newPath.split('/').pop()}`;

    await db.createPost(author_id, img_url, fields.desc).catch((error) => {
      deleteFile(newPath);
      throw error;
    });

    return res.status(200).json({ message: 'Create post successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
