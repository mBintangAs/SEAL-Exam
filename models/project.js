import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";

export const Project = sequelize.define(
  'Project',
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
   
  },
  {
    // Other model options go here
  },
);

// `sequelize.define` also returns the model
console.log(Project === sequelize.models.Project); // true