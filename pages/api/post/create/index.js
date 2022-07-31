import formidable from 'formidable';

export default async function handler(req, res) {
  // create an incoming form object
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, file) => {
    console.log(fields);
    console.log(file);
    res.status(200).json({ message: 'test' });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
