import { deleteAsync } from 'del';
import mv from 'mv';

export const deleteFile = async (filePat) => {
  await deleteAsync([filePat]);
};

export const moveFile = async (file) => {
  return new Promise((resolve, reject) => {
    const tempPath = file.filepath;
    const newPath = `./public/uploads/images/${new Date().getTime()}${
      file.newFilename
    }`;
    mv(tempPath, newPath, (err) => {
      if (err) return reject(err);
      resolve(newPath);
    });
  });
};
