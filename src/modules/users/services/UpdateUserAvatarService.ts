import AppError from "@shared/errors/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import UserRepository from "../infra/typeorm/repositories/UsersRepositorie";
import uploadConfig from '@config/upload';
import fs from 'fs'


interface IRequest{
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService{
  public async execute({user_id,avatarFileName}: IRequest){
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(user_id);

    if(!user){
      throw new AppError('User not found');
    }

    if(user.avatar){
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName

    await usersRepository.save(user);

    return user
  }

}

export default UpdateUserAvatarService;
