import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminSecret =
      process.env.ADMIN_PASSWORD_HASH?.trim() || process.env.ADMIN_PASSWORD?.trim();
    if (!adminEmail || !adminSecret) {
      return res.status(500).json({ message: 'Server admin not configured' });
    }
    if (email !== adminEmail) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const looksHashed = /^\$2[aby]\$/.test(adminSecret);
    const match = looksHashed
      ? await bcrypt.compare(password, adminSecret).catch(() => false)
      : password === adminSecret;
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return res.json({ token, email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login failed' });
  }
}
