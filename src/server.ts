import express from 'express';
import dotenv from 'dotenv';
import mainRoutes  from './Routes/router'

dotenv.config();

const app = express();

app.use(mainRoutes)

app.listen(process.env.PORT);

console.log(`Servidor rodando na porta: ${process.env.PORT}`)