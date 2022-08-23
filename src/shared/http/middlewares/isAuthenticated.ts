import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import authConfig from '@config/auth'

interface TokenPayload{
  iat:number,
  exp: number,
  sub: string
}

export default function isAuthenticated(req:Request, res:Response, next: NextFunction):void{
  const authHeader = req.headers.authorization
  if(!authHeader){
    throw new AppError('JWT Token is missing')
  }

  const token = authHeader.split(' ')[1];

  try{
    const decodeToken = jwt.verify(token, authConfig.jwt.secret)
    const {sub} = decodeToken as TokenPayload;

    req.user = {
      id: sub
    }
    return next()
  }catch(err){
    throw new AppError('Invalid token')
  }
}
