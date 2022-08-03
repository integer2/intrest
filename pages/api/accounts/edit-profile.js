import db from '@/libs/db';
import authorization from '@/middlewares/authorization';

import dataForm from '@/middlewares/data-form';
import { moveFile, deleteFile } from '@/utils/file-manager';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST')
      return res.status(405).json({ error: 'Method not allowed' });

    const auth = await authorization(req, res);

    const { fields, files } = await dataForm(req);

    let img_url = null;

    if (Object.keys(files).length > 0) {
      const newPath = await moveFile(files.file);
      img_url = `/uploads/images/${newPath.split('/').pop()}`;
    }

    const { id: user_id } = auth;
    const { email, username, name, birthday, gender, bio, current_img_url } =
      fields;

    await db
      .updateUserInfo(
        user_id,
        email,
        username,
        name,
        birthday,
        gender,
        bio,
        img_url || current_img_url
      )
      .catch((error) => {
        deleteFile(newPath);
        throw error;
      });

    if (img_url !== current_img_url) {
      if (img_url) {
        const oldPath = `./public${current_img_url}`;
        await deleteFile(oldPath);
      }
    }

    res.status(200).json({ message: 'Edit Profile' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

// create config for nextjs api
export const config = {
  api: {
    bodyParser: false,
  },
};
