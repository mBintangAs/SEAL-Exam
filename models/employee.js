import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";
import 'dotenv/config'

export const Employee = sequelize.define(
  'Employee',
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        get() {
            // Membentuk URL avatar secara otomatis
            const avatar = this.getDataValue('avatar');
            if (avatar) {
              return `${process.env.BASE_URL}/avatars/${avatar}`;
            }
            return null;
          }
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
    },
    
  },
  {
    // Other model options go here
  },
);

// `sequelize.define` also returns the model
console.log(Employee === sequelize.models.Employee); // true