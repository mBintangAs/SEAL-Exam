import { Employee } from "../models/employee.js";
import { hashPassword } from "./auth.js";
import fs from 'fs';
import path from 'path';

export const findEmployee = async () => {
    try {

        const employees = await Employee.findAll({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });
        return employees;
    } catch (error) {
        throw new Error('Error finding employees: ' + error.message);
    }
}

export const createEmployee = async (req) => {
    try {
        const { name, username, password } = req.body;
        const avatar = req.file ? req.file.filename : null; // Mendapatkan nama file avatar
        const hashedPassword = await hashPassword(password);

        await Employee.create({
            name,
            username,
            password: hashedPassword,
            avatar,
        });
        return {message:"Success creating employee"};

    } catch (error) {
        return { message: 'Error creating employee', error };
    }
}

export const updateEmployee = async (req) => {
    try {
        const { id } = req.params; // ID karyawan untuk diperbarui
        const { name, username, password } = req.body;
        const avatar = req.file ? req.file.filename : null; // Mendapatkan nama file avatar (jika ada)

        // Cari karyawan berdasarkan ID
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return { message: 'Employee not found', status: 404 };
        }

        // Update hanya field yang diberikan
        const updatedFields = {
            name: name || employee.name,
            username: username || employee.username,
            avatar: avatar || employee.avatar.split('/').pop(),
        };

        // Update password jika disediakan
        if (password) {
            updatedFields.password = await hashPassword(password);
        }
        const oldAvatar = employee.avatar.split('/').pop();
        // Perbarui data karyawan
        await employee.update(updatedFields);
        if (avatar && oldAvatar) {

            const oldAvatarPath = path.join('public/avatars', oldAvatar);
            console.log(oldAvatarPath);
            fs.unlink(oldAvatarPath, (err) => {
                if (err) {
                    console.error('Error deleting old avatar:', err);
                }
            });
        }

        return {message:"Success updating employee"};
    } catch (error) {
        return { message: 'Error updating employee', error };
    }
};
export const deleteEmployee = async (req) => {
    try {
        const { id } = req.params; // ID karyawan untuk diperbarui
       
        // Cari karyawan berdasarkan ID
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return { message: 'Employee not found', status: 404 };
        }

        const oldAvatar = employee.avatar.split('/').pop();
        if (oldAvatar) {

            const oldAvatarPath = path.join('public/avatars', oldAvatar);
            console.log(oldAvatarPath);
            fs.unlink(oldAvatarPath, (err) => {
                if (err) {
                    console.error('Error deleting old avatar:', err);
                }
            });
        }
        await employee.destroy();
        return {message:"Success delete employee"};
    } catch (error) {
        console.log(error);
        return { message: 'Error delete employee', error };
    }
};
