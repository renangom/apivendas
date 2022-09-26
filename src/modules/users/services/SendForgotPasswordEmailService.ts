import etherealMail from "@config/mail/etherealmail";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import path from "path";
import UserRepository from "../infra/typeorm/repositories/UsersRepositorie"
import UserTokenRepository from "../infra/typeorm/repositories/UserTokenRepository";

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

    const forgotPasswordTemplate = path.resolve(__dirname,'..', 'views', 'forgotPassword.hbs')
    await etherealMail.sendMail({
      to:{
        name: user.name,
        email: user.email
      },
      subject: '[API VENDAS] Recuperação de senha',
      templateData:{
        file:forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_URL}/reset_password?token=${token}`
        }
      }
    })

    console.log(token);

  }

}

export default SendForgotPasswordEmailService
