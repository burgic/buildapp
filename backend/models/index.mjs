import Sequelize from 'sequelize';
import configObj from '../config/config.mjs';

const config = configObj.development;

import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres', // Change this to 'postgres'
    port: process.env.DATABASE_PORT || 5432, // PostgreSQL default port is 5432
  }
);


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

import AdminModel from './Admin.mjs';
import ClientModel from './Client.mjs';

db.Admin = AdminModel(sequelize, Sequelize.DataTypes);
db.Client = ClientModel(sequelize, Sequelize.DataTypes);
// Add other models as needed

export default db;
