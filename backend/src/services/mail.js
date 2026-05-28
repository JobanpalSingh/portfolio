import nodemailer from 'nodemailer';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getTransport() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_SECURE === '1',
    auth: { user, pass },
  });
}

/**
 * Sends a notification email when the contact form is submitted.
 * If SMTP is not configured, resolves without throwing (caller still saves to DB).
 */
export async function sendContactNotification({ name, email, subject, message, id }) {
  const to = (process.env.CONTACT_NOTIFY_EMAIL || process.env.SMTP_USER || '').trim();
  if (!to) {
    console.warn('[mail] CONTACT_NOTIFY_EMAIL (or SMTP_USER) not set; skipping email');
    return { sent: false, reason: 'no_recipient' };
  }

  const transport = getTransport();
  if (!transport) {
    console.warn('[mail] SMTP_HOST / SMTP_USER / SMTP_PASS not fully set; skipping email');
    return { sent: false, reason: 'no_smtp' };
  }

  const from = process.env.MAIL_FROM?.trim() || `"Portfolio contact" <${process.env.SMTP_USER}>`;
  const text = [
    `New message from your portfolio contact form`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject || '(none)'}`,
    ``,
    message,
    ``,
    `— MongoDB id: ${id}`,
  ].join('\n');

  const html = `
    <h2 style="font-family:sans-serif;font-size:16px;">New portfolio contact</h2>
    <p style="font-family:sans-serif;font-size:14px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p style="font-family:sans-serif;font-size:14px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <p style="font-family:sans-serif;font-size:14px;"><strong>Subject:</strong> ${escapeHtml(subject || '—')}</p>
    <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
    <pre style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;">${escapeHtml(message)}</pre>
    <p style="font-family:sans-serif;font-size:12px;color:#666;">Id: ${escapeHtml(String(id))}</p>
  `;

  await transport.sendMail({
    from,
    to,
    replyTo: email,
    subject: `[Portfolio] ${subject?.trim() || 'Contact'} — ${name}`.slice(0, 200),
    text,
    html,
  });

  return { sent: true };
}
