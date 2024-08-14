import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Employee } from '../models/employee.js';
import 'dotenv/config'

export const authCheck = async (username, password) => {
    const employee = await Employee.findOne({ where: { username } });

    if (!employee) {
        return { message: 'Employee Not Found' };
    }
    const isMatch = await comparePassword(password, employee.password);
    if (!isMatch) {
        return { message: 'Invalid credentials' };
    }
    // Jika password cocok, buat token JWT
    const token = jwt.sign({ id: employee.id, username: employee.username, is_admin: employee.is_admin }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Kembalikan token kepada pengguna
    return { "token": token }
}
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        throw new Error('Error hashing password');
    }
};

// Fungsi untuk membandingkan password dengan hash
const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (err) {
        throw new Error('Error comparing password');
    }
};



