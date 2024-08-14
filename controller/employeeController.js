import { createEmployee, deleteEmployee, findEmployee, updateEmployee } from "../service/employee.js";
import { upload } from "../service/file.js";

export const index = async (req, res) => {
    try {
        const employee = await findEmployee();
        res.json(employee);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const store = async (req, res) => {
    try {
        upload.single('avatar')(req, res, async (err) => {
            // console.log(req.body.textData);
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error uploading file', error: err.message });
            }

            const employee = await createEmployee(req);

            res.status(201).json(employee);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating employee', error });
    }
}
export const update = async (req, res) => {
    try {
        upload.single('avatar')(req, res, async (err) => {
            // console.log(req.body.textData);
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error uploading file', error: err.message });
            }

            const employee = await updateEmployee(req);

            res.status(201).json(employee);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating employee', error });
    }
}
export const destroy = async(req,res) => {
    try {

        const employee = await deleteEmployee(req);

        res.status(201).json(employee);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error delete employee', error });
    }
}