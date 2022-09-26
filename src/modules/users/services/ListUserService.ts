import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UserRepository from "../infra/typeorm/repositories/UsersRepositorie";

class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepo = getCustomRepository(UserRepository);

    const users = await userRepo.find();

    return users;
  }
}

export default ListUserService;
