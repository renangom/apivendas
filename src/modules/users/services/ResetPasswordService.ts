import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UsersRepositorie";
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository";
import {isAfter, addHours} from 'date-fns'
import bcrypt from 'bcryptjs'

interface IRequest{
  token: string,
  password: string
}

class ResetPasswordService{
  public async execute({token, password}: IRequest){
    const usersRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);
    if(!userToken){
      throw new AppError('User Token does not exist');
    }

    const user = await usersRepository.findById(userToken.user_id)
    if(!user){
      throw new AppError('User does not exist');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if(isAfter(Date.now(), compareDate)){
      throw new AppError('Token expired')
    }

    user.password = await bcrypt.hash(password,8);

    await usersRepository.save(user);

  }

}

export default ResetPasswordService;
