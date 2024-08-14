import { createTask, deleteTask, findTask, updateTask } from "../service/task.js";

export const index = async (req, res) => {
    try {
        const task = await findTask();
        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const store = async (req, res) => {
    try {

        const task = await createTask(req);

        res.status(201).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating task', error });
    }
}
export const update = async (req, res) => {
    try {
        const task = await updateTask(req);

        res.status(201).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating task', error });
    }
}
export const destroy = async (req, res) => {
    try {

        const task = await deleteTask(req);

        res.status(201).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error delete task', error });
    }
}