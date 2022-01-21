import { Sequelize } from 'sequelize';

let DB_URI: string = String(process.env.DB_URI);

// const sequelize = new Sequelize(DB_URI);

// const sequelize = new Sequelize('starwars', 'postgres', '1971Samperfect', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

const sequelize = new Sequelize(
  'starwars',
  'samperfect',
  'xcrIrTpQtwtKBhmDKXoumT08V42taS4d',
  {
    host: 'dpg-c7l65dfs437trl00u14g',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    port: 5432,
  }
);

export default sequelize;
