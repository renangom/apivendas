import nodemailer from 'nodemailer';

interface ISendEmail{
  to: string;
  body: string;

}

export default class etherealMail {
  static async sendMail({to, body}: ISendEmail): Promise<void>{

    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    })

    const message = await transporter.sendMail({
      from: 'equipe@renan.com.br',
      to: to,
      subject: 'Recuperação de Senha',
      text: body
    })

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
