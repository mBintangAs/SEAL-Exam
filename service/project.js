import { Project } from "../models/project.js";
export const findProject = async () => {
    try {

        const projects = await Project.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        return projects;
    } catch (error) {
        throw new Error('Error finding projects: ' + error.message);
    }
}

export const createProject = async (req) => {
    try {
        const { name, description } = req.body;

        await Project.create({
            name, description
        });
        return { message: "Success creating project" };

    } catch (error) {
        return { message: 'Error creating project', error };
    }
}

export const updateProject = async (req) => {
    try {
        const { id } = req.params; 
        const { name, description } = req.body;

        const project = await Project.findByPk(id);

        if (!project) {
            return { message: 'project not found', status: 404 };
        }

        const updatedFields = {
            name: name || project.name,
            description: description || project.description,
        };

        await project.update(updatedFields);

        return { message: "Success updating project" };
    } catch (error) {
        return { message: 'Error updating project', error };
    }
};
export const deleteProject = async (req) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);

        if (!project) {
            return { message: 'Project not found', status: 404 };
        }
        await project.destroy();
        return { message: "Success delete project" };
    } catch (error) {
        console.log(error);
        return { message: 'Error delete project', error };
    }
};
