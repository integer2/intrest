import authorization from "middlewares/authorization";

export default function handler(req, res) {
  if(req.method !== "POST")  return res.status(405).json({ error: "Method not allowed" });
  authorization(req);
  res.status(200).json({
    message: "Halo Apa Kabar"
  })
}
