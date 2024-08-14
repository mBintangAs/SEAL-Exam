import { createProject, deleteProject, findProject, updateProject } from "../service/project.js";

export const index = async (req, res) => {
    try {
        const project = await findProject();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const store = async (req, res) => {
    try {

        const project = await createProject(req);

        res.status(201).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating project', error });
    }
}
export const update = async (req, res) => {
    try {
        const project = await updateProject(req);

        res.status(201).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating project', error });
    }
}
export const destroy = async (req, res) => {
    try {

        const project = await deleteProject(req);

        res.status(201).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error delete project', error });
    }
}