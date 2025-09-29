# Backend da aplicação Apojobs - Plataforma de Empregos Inclusiva

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js) ![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql) ![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma) ![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)


API backend desenvolvida em **Node.js** com **Express** e **PostgreSQL**, utilizando **Prisma ORM** para modelagem de dados e migrations.  
Este projeto faz parte do curso **TIC 2025** e tem como objetivo consolidar boas práticas no desenvolvimento de **APIs modernas**.  

## 🎯 Objetivo

Fornecer uma API escalável e bem estruturada para consumo por aplicações frontend, abordando:  
- Desenvolvimento backend com **Node.js + Express**  
- Persistência de dados em **PostgreSQL** com **Prisma ORM**  
- Organização de rotas, controladores e middlewares  
- Uso de **TypeScript** para tipagem e segurança

## 🚀 Tecnologias Utilizadas

- **Node.js 20.x** – Runtime JavaScript  
- **Express 4.x** – Framework minimalista para APIs  
- **TypeScript** – Superset de JavaScript com tipagem estática  
- **Prisma 5.x** – ORM moderno para PostgreSQL  
- **PostgreSQL 16** – Banco de dados relacional  
- **ts-node-dev / tsx** – Execução e hot reload de TypeScript  

## 📁 Estrutura do Projeto

```
tic-2025-back/
│
├── prisma/ # Configuração do Prisma e migrations
│ └── schema.prisma # Definição do banco de dados
│
├── src/
│ ├── controllers/ # Regras de negócio e lógica da aplicação
│ ├── middlewares/ # Middlewares (auth, validações, logs, etc.)
│ ├── routes/ # Definição das rotas da API
│ ├── services/ # Serviços auxiliares (ex: autenticação)
│ ├── utils/ # Funções utilitárias
│ ├── index.ts # Ponto de entrada da aplicação
│ └── server.ts # Configuração do servidor Express
│
├── .env # Variáveis de ambiente (DATABASE_URL, etc.)
├── package.json # Dependências e scripts
└── tsconfig.json # Configuração do TypeScript
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- **Node.js** (>= 20)  
- **PostgreSQL** (>= 16)  
- **npm** ou **yarn**  

### Passos
```bash
# Clone o repositório
git clone https://github.com/t4Facef/tic-2025-back.git

# Acesse a pasta
cd tic-2025-back

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

Edite o arquivo .env com a sua conexão PostgreSQL, por exemplo:

```ini
DATABASE_URL="postgresql://usuario:senha@localhost:5432/tic2025"
```

## 🗄️ Banco de Dados e Prisma

Rodar migrations para criar as tabelas no PostgreSQL:

```bash
npx prisma migrate dev --name init
```

Visualizar o banco de dados com Prisma Studio:

```bash
npx prisma studio
```

## 🚀 Scripts Disponíveis

```bash
# Inicia o servidor em modo desenvolvimento
npm run dev

# Compila o TypeScript
npm run build

# Inicia o servidor em produção
npm start

# Executa migrations do Prisma
npm run migrate
```

## 📱 Endpoints Principais
(exemplo de possíveis endpoints – ajuste conforme suas rotas)
- POST /auth/register → Registro de usuário
- POST /auth/login → Login e geração de token JWT
- GET /users → Lista todos os usuários
- GET /users/:id → Detalhes de um usuário específico
- POST /items → Criação de item
- GET /items → Listagem de itens

## 🔧 Desenvolvimento

- ✅ Estrutura base do projeto configurada
- ✅ Conexão com PostgreSQL via Prisma
- ✅ Organização em rotas, controllers e middlewares
- ✅ Variáveis de ambiente com .env
- 🚧 Autenticação com JWT (em desenvolvimento)
- 🚧 Testes automatizados (planejado)

## 🧪 Testes

Adicionar testes com Jest ou Vitest (planejado):
```bash
npm run test
```

## 📦 Deploy

Sugestões de deploy:

- Render ou Railway (deploy gratuito e simples)
- Docker para containerização do backend e banco PostgreSQL

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (git checkout -b feature/nova-feature)
3. Commit suas mudanças (git commit -m 'Adiciona nova feature')
4. Push para a branch (git push origin feature/nova-feature)
5. Abra um Pull Request

## 🎓 Contexto Acadêmico

Projeto desenvolvido como trabalho acadêmico para o curso TIC 2025, com foco em:
- Desenvolvimento de APIs modernas
- Banco de dados relacionais com PostgreSQL
- ORM com Prisma
- Boas práticas de organização backend

---

**Apojobs** - Conectando talentos às oportunidades certas.