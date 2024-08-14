import express from 'express';
import bodyParser from "body-parser";
import 'dotenv/config'
import  {sequelize}  from './models/index.js';
import { router as AuthRouter } from './route/auth.js';
import { router as EmployeeRouter } from './route/employee.js';
import { router as ProjectRouter } from './route/project.js';
import { router as TaskRouter } from './route/task.js';
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/avatars', express.static('public/avatars'));

app.use(AuthRouter)
app.use(EmployeeRouter)
app.use(ProjectRouter)
app.use(TaskRouter)
app.listen(process.env.APP_PORT, () => console.log(`${process.env.APP_NAME} running on port ${process.env.APP_PORT}`));
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }