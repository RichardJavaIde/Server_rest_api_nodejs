import express  from 'express'
import router from './routers'
import db from './config/db'
import colors from 'colors'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import cors,{CorsOptions} from 'cors'
import e from 'express'

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
//Permitir solicitudes desde cualquier origen (CORS)
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {  
      console.log("CORS origin allowed:", origin);
    }else {
      console.log("CORS origin blocked:", origin);
    }

    callback(null, true);
    console.log("CORS origin:", origin);
  }
}
server.use(cors(corsOptions));
//Leer datos de body
server.use(express.json())

//server.use('/', router)
server.use('/products', router)
server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default server