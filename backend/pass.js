import bcrypt from 'bcrypt';

const hashPassword = async () => {
  const hashed = await bcrypt.hash('pass123', 10);
  console.log('Hashed password:', hashed);
};

hashPassword();
