import Sequelize from 'sequelize';
import configObj from '../config/config.mjs';

const config = configObj.development;

import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_URL || 'postgres://localhost:5432/your_database_name',
    {
      dialect: 'postgres',
      dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
          require: true,
          rejectUnauthorized: false
        } : false
      }
    }
  );

// db
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

import AdminModel from './Admin.mjs';
import ClientModel from './Client.mjs';

db.Admin = AdminModel(sequelize, Sequelize.DataTypes);
db.Client = ClientModel(sequelize, Sequelize.DataTypes);
// Add other models as needed

export default db;
