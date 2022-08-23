import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepositorie";
import bcrypt from 'bcryptjs'

interface IRequest{
  name:string,
  email:string,
  password:string,
  avatar:string
}

class CreateUserService{
  public async execute({name, email, password,avatar}: IRequest):Promise<User>{
    const userRepo = getCustomRepository(UserRepository);

    const emailExists = await userRepo.findByEmail(email);
    if(emailExists){
      throw new AppError("There is already an user using this email")
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = userRepo.create({
      name,
      email,
      password:hashedPassword,
      avatar
    })

    await userRepo.save(user);

    return user;
  }
}

export default CreateUserService;
