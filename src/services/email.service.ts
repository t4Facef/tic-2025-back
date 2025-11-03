import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const EmailService = {
  async enviarEmail(para: string, assunto: string, conteudo: string) {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: para,
      subject: assunto,
      html: conteudo,
    };

    await transporter.sendMail(mailOptions);
  },

  async enviarEmailRedefinicaoSenha(email: string, resetLink: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin: 0;">Apojobs</h1>
            <p style="color: #7f8c8d; margin: 5px 0 0 0;">Plataforma de Empregos Inclusiva</p>
          </div>
          
          <h2 style="color: #34495e; margin-bottom: 20px;">Redefinição de Senha</h2>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
            Olá! Você solicitou a redefinição de sua senha na plataforma Apojobs.
          </p>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 30px;">
            Clique no botão abaixo para criar uma nova senha:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #3498db; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; font-size: 16px;">
              Redefinir Minha Senha
            </a>
          </div>
          
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
            <p style="color: #856404; margin: 0; font-size: 14px;">
              <strong>⚠️ Importante:</strong> Este link expira em 1 hora por segurança.
            </p>
          </div>
          
          <p style="color: #7f8c8d; font-size: 14px; line-height: 1.5; margin-top: 30px;">
            Se você não solicitou esta redefinição de senha, pode ignorar este email com segurança. Sua senha atual permanecerá inalterada.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #95a5a6; font-size: 12px; text-align: center; margin: 0;">
            Este é um email automático. Por favor, não responda.
          </p>
        </div>
      </div>
    `;

    await this.enviarEmail(email, 'Redefinição de Senha - Apojobs', html);
  },
};