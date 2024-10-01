import { Sequelize } from 'sequelize';
import { DB_NAME, DB_HOST, DB_USER, DB_PASS } from './config';

const sequelize = new Sequelize(DB_NAME, DB_PASS, DB_USER, {
    host: DB_HOST,
    dialect: 'postgres',
    logging: false
});

export default sequelize;