import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Manufacturer = sequelize.define('Manufacturer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carModelName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
