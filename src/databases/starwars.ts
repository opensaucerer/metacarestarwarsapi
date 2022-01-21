import { Sequelize } from 'sequelize';

let DATABASE_URL: string = String(process.env.DATABASE_URL);

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export default sequelize;
