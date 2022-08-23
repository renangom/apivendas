import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/UsersRepositorie"
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import bcrypt, { hash } from 'bcryptjs'

interface IRequest{
  user_id:string,
  name: string,
  email: string,
  password?: string,
  old_password?: string
}

class UpdateUserProfileService{
  public async execute({user_id,name, email, password, old_password}:IRequest):Promise<User>{
    const userRepo = getCustomRepository(UserRepository)

    const user = await userRepo.findById(user_id);
    if(!user){
      throw new AppError('User does not exist')
    }

    const userUpdatedEmail = await userRepo.findByEmail(email);
    if(userUpdatedEmail && userUpdatedEmail.id !== user_id){
      throw new AppError('there is already an user with this email');
    }

    if(password && !old_password){
      throw new AppError('Old password is required');
    }

    if(password &&  old_password){
      const checkOldPassword = await bcrypt.compare(old_password, user.password);
      if(!checkOldPassword){
        throw new AppError('Old password does not match.');
      }

      user.password = await bcrypt.hash(password, 8);
    }


    user.name = name;
    user.email = email;

    await userRepo.save(user)

    return user;
  }
}

export default UpdateUserProfileService;
