import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@cleaning.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      const adminUser = new User({
        username: 'admin',
        name: 'Admin',
        email: 'admin@cleaning.com',
        password_hash: hashedPassword,
        isAdmin: true,
      });

      await adminUser.save();
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
  } catch (err) {
    console.error('❌ Admin seeding error:', err);
  }
};

export default seedAdmin;
