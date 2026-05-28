/**
 * Usage: node scripts/hashPassword.js "your-plain-password"
 * Copy the printed hash into ADMIN_PASSWORD in .env (bcrypt hash).
 */
import bcrypt from 'bcryptjs';

const plain = process.argv[2];
if (!plain) {
  console.error('Usage: node scripts/hashPassword.js "your-password"');
  process.exit(1);
}
const hash = await bcrypt.hash(plain, 12);
console.log(hash);
