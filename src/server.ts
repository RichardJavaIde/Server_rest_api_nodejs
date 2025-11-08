import express  from 'express'
import router from './routers'
import db from './config/db'
import colors from 'colors'

//Test DB connection
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue.bold('DataBase connected'));
  } catch (error) {
    console.log(colors.red(`Error DB connection: ${error}`));
  }
}
connectDB()
const server = express()

server.use('/', router)

export default server