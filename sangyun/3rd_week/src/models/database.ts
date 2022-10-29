import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

const bTestMode = process.env.TEST_MODE;

console.log("bTestMode: ", bTestMode);

if (bTestMode=="FALSE") {
  dataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
  });
}

export default dataSource;