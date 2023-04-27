import cors from 'cors';
import express from 'express';
import session from 'express-session';
import userRoutes from './routes/users.js';

const app = express();

// Configurar o middleware express-session
app.use(session({
  secret: 'my-secret-key', // chave secreta usada para criptografar a sessão
  resave: false,
  saveUninitialized: false
}));

app.use(express.json());
app.use(cors());
app.use('/', userRoutes);

app.listen(8800);

export { app };

