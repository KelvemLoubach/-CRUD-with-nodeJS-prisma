import express from 'express';
import dotenv from 'dotenv';
import mainRoutes  from './Routes/router';


dotenv.config();

const app = express();

// Usando o middleware nativo do express "urlencoded". Esse middleware analisa solicitações post com enctype definido como "application/x-www-form-urlencoded" para tornar os dados recebidos pelo body facilmente acessíveis do lado do servidor.
// Extended: true --> Permiti o uso de objetos e matrizes aninhados, se houver.
app.use(express.urlencoded({extended:true}));

app.use(mainRoutes);

app.listen(process.env.PORT);

console.log(`Servidor rodando na porta: ${process.env.PORT}`)