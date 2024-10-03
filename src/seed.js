import bcrypt from 'bcryptjs';
import Admin from './modules/admin/models/admin-models.js';

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash('adminKryptic', 10);
  await Admin.create({
    name: 'Admin Kryptic',
    email: 'adminKryptic@gmail.com',
    password: hashedPassword,
    role: 'admin'
  });
};

export default seedAdmin;