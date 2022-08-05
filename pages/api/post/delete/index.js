import db from '@/libs/db';
import authorization from '@/middlewares/authorization';
import { deleteFile } from '@/utils/file-manager';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    await authorization(req, res);
    const data = req.body;
    console.log(data);

    await db.deletePost(data.id).then((result) => {
      const oldImagePath = './public' + data.img_url;
      console.log(oldImagePath);
      deleteFile(oldImagePath);
    });

    return res.json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
}
