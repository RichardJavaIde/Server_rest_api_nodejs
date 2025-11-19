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
//instancia de express
const server = express()

//Leer datos de body
server.use(express.json())

server.use('/', router)
server.use('/products', router)

export default server