"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
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
exports.EmailService = {
    async enviarEmail(para, assunto, conteudo) {
        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: para,
            subject: assunto,
            html: conteudo,
        };
        await transporter.sendMail(mailOptions);
    },
    async enviarEmailRedefinicaoSenha(email, resetLink) {
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Redefinição de Senha - PCD Jobs</h2>
        <p>Você solicitou a redefinição de sua senha.</p>
        <p>Clique no botão abaixo para redefinir sua senha:</p>
        <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Redefinir Senha
        </a>
        <p>Este link expira em 1 hora.</p>
        <p>Se você não solicitou esta redefinição, ignore este email.</p>
      </div>
    `;
        await this.enviarEmail(email, 'Redefinição de Senha - PCD Jobs', html);
    },
};
