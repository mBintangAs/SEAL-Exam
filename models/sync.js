import { hashPassword } from "../service/password.js";
import { Employee } from "./employee.js";
import { Project } from "./project.js";
import { Task } from "./task.js";
const force = false;

const sync = async () => {
    try {
        await Employee.sync({ force })
        await Employee.create({ name: "admin", username: "Admin", password: await hashPassword("123"), is_admin: true })
        await Project.sync({ force })
        await Task.sync({ force })
    } catch (error) {
        console.log(error);
    }
}
sync()