"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestEmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Alternativa para testes - cria conta temporária
const createTestEmailService = async () => {
    const testAccount = await nodemailer_1.default.createTestAccount();
    const transporter = nodemailer_1.default.createTransport({
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
        getPreviewUrl: (info) => nodemailer_1.default.getTestMessageUrl(info)
    };
};
exports.createTestEmailService = createTestEmailService;
