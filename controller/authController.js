import { authCheck } from "../service/auth.js";
import 'dotenv/config'
import jwt from "jsonwebtoken";


export const auth = async (req, res) => {
    try {
        const { username, password } = req.body;
        const response = await authCheck(username, password);
        res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Menyimpan informasi pengguna yang di-decode ke req.user
        next(); // Lanjut ke middleware atau controller berikutnya
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: 'Invalid token!' });
    }
}
export const isAdmin = (req, res, next) => {

    try {
        if (req.user.is_admin == true) {

            next();
        }else{
            res.status(403).json({ message: 'Not authorized!' });

        }
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: 'Invalid Role!' });
    }
}