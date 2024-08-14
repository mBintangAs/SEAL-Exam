import { Employee } from "../models/employee.js";
import { Project } from "../models/project.js";
import { Task } from "../models/task.js";
export const findTask = async (req) => {
    try {
        const tasks = await Task.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: Project,
                    attributes: ['name'], // Mengambil hanya atribut nama project
                },
                {
                    model: Employee,
                    attributes: ['name'], // Mengambil hanya atribut nama employee
                },
            ]
        });
        return tasks;
    } catch (error) {
        throw new Error('Error finding tasks: ' + error.message);
    }
}

export const createTask = async (req) => {
    try {

        const { name, description, deadline, project_id } = req.body;
        let employee_id = req.body?.employee_id
        if (!req.user.is_admin) {
            employee_id = req.user.id
        }
        await Task.create({
            name, description, deadline, project_id, employee_id
        });
        return { message: "Success creating task" };

    } catch (error) {
        return { message: 'Error creating task', error };
    }
}

export const updateTask = async (req) => {
    try {
        const { id } = req.params;


        const task = await Task.findByPk(id);

        if (!task) {
            return { message: 'task not found', status: 404 };
        }

        const { name, description, deadline, is_done } = req.body;
        let employee_id = req.body?.employee_id
        if (!req.user.is_admin) {
            employee_id = req.user.id
        }
        const updatedFields = {
            name: name || task.name,
            description: description || task.description,
            deadline: deadline || task.deadline,
            employee_id: employee_id || task.employee_id,
            is_done: is_done || task.is_done,
        };

        await task.update(updatedFields);

        return { message: "Success updating task" };
    } catch (error) {
        console.log(error);
        return { message: 'Error updating task', error };
    }
};
export const deleteTask = async (req) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return { message: 'task not found', status: 404 };
        }
        if (!req.user.is_admin && task.employee_id != req.user.id) {
            return { message: 'this isn\'t your task', status: 400 };
        }
        await task.destroy();
        return { message: "Success delete task" };
    } catch (error) {
        console.log(error);
        return { message: 'Error delete task', error };
    }
};
