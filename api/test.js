export default async function handler(req, res) {
  try {
    const nodemailer = await import("nodemailer");
    return res.status(200).json({ ok: true, hasNodemailer: !!nodemailer.default });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message, stack: err.stack });
  }
}
