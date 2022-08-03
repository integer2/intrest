import { IncomingForm } from 'formidable';

export default function dataForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      // check is files is empty
      if (Object.keys(files).length === 0) {
        resolve({ fields, files: {} });
      }
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}
