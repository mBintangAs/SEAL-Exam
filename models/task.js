import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";
import { Project } from "./project.js";
import { Employee } from "./employee.js";


export const Task = sequelize.define(
  'Task',
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      model: "Employee",
      key: 'id',
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      model: "Project",
      key: 'id',
    },
  },
  {
    // Other model options go here
  },
);

// `sequelize.define` also returns the model
console.log(Task === sequelize.models.Task); // true
// Task.js
Task.belongsTo(Project, { foreignKey: 'project_id' });
Task.belongsTo(Employee, { foreignKey: 'employee_id' });
