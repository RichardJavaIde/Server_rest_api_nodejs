import express  from 'express'
import router from './routers'
import db from './config/db'

//Test DB connection
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log('DataBase connected');
  } catch (error) {
    console.log('Error DB connection: ', error);
  }
}
connectDB()
const server = express()

server.use('/', router)

export default server