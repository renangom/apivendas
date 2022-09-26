import AppError from "@shared/errors/AppError"
import { getCustomRepository } from "typeorm"
import User from "../infra/typeorm/entities/User"
import UserRepository from "../infra/typeorm/repositories/UsersRepositorie"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import authConfig from '../../../config/auth'


interface IRequest {
  email: string,
  password: string
}

interface IResponse {
  user: User,
  token: string
}

class CreateSessionService{
  public async execute({email, password}: IRequest): Promise<IResponse>{

    const userRepo = getCustomRepository(UserRepository);

    const user = await userRepo.findByEmail(email);

    if(!user){
      throw new AppError('Email/password is incorrect', 401);
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if(!passwordCorrect){
      throw new AppError("Email/password is incorrect", 401);
    }

    const token = jwt.sign({}, authConfig.jwt.secret, {subject: user.id,expiresIn: authConfig.jwt.expiresIn})
    return {
      user,
      token
    };
  }
}

export default CreateSessionService;
