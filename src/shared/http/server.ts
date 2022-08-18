import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import 'express-async-errors'
import '@shared/typeorm'
import {errors} from 'celebrate'

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

//middleware para tratamento de erros
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  //verificando se o erro recebido é uma instancia da nossa classe criada
  if(error instanceof AppError){
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})


app.listen(3333, () => {
  console.log("Server is running on port 3333")
})
