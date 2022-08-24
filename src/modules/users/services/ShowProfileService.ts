import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepositorie";

class ShowProfileService{
  public async execute(id:string):Promise<User>{
    const userRepo = getCustomRepository(UserRepository);

    const user = await userRepo.findById(id)
    if(!user){
      throw new AppError("User not found");
    }

    return user;
  }
}

export default ShowProfileService;
