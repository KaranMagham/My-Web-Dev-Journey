require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Simple health
app.get('/', (req, res) => res.json({ ok: true, service: 'expenses-backend' }));

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const to = process.env.TO_EMAIL || process.env.SMTP_USER;
    const from = process.env.FROM_EMAIL || process.env.SMTP_USER;

    const mailOptions = {
      from: `${name} <${from}>`,
      to,
      subject: `[Contact Form] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr/>
            <p>${message.replace(/\n/g, '<br/>')}</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    return res.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error('Error sending contact email:', err);
    return res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Expenses backend listening on http://localhost:${PORT}`);
});
