import etherealMail from "@config/mail/etherealmail";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/UsersRepositorie"
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository";

interface IRequest{
  email:string
}

class SendForgotPasswordEmailService{
  public async execute({email}:IRequest):Promise<void>{
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await userRepository.findByEmail(email);

    if(!user){
      console.log('passei por aqui')
      throw new AppError('User not found')
    }

    const token = await userTokenRepository.generate(user.id);


    await etherealMail.sendMail({
      to:{
        name: user.name,
        email: user.email
      },
      subject: '[API VENDAS] Recuperação de senha',
      templateData:{
        template: `Olá {{name}} :{{token}}`,
        variables: {
          name: user.name,
          token: token?.token
        }
      }
    })

    console.log(token);

  }

}

export default SendForgotPasswordEmailService
