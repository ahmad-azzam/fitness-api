import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

const dbName = DB_NAME as string;
const dbUsername = DB_USERNAME as string;
const dbPassword = DB_PASSWORD as string;
const dbHost = DB_HOST;
const dbDialect = "postgres";

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
});

export default sequelizeConnection;
