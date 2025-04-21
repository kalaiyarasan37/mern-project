import bcrypt from 'bcryptjs';

const plainPassword = 'pass123';
const storedHash = '$2b$10$xMFU.YExB5uUak1V0KYV7.616hFKFfQTeeoch8ETfCkigE/pnEM/W'; // from MongoDB

const result = await bcrypt.compare(plainPassword, storedHash);
console.log('Password match:', result);
