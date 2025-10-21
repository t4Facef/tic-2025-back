import nodemailer from 'nodemailer';

// Alternativa para testes - cria conta temporária
export const createTestEmailService = async () => {
  const testAccount = await nodemailer.createTestAccount();
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return {
    transporter,
    getPreviewUrl: (info: any) => nodemailer.getTestMessageUrl(info)
  };
};