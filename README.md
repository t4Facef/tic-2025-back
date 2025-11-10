# 🚀 TIC 2025 - Backend API# Backend da aplicação Apojobs - Plataforma de Empregos Inclusiva



## 📋 Sobre o Projeto![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js) ![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql) ![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma) ![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)



API RESTful desenvolvida para conectar Pessoas com Deficiência (PcD) a oportunidades de emprego, promovendo inclusão e acessibilidade no mercado de trabalho. Sistema completo de gerenciamento de candidatos, empresas, vagas e candidaturas com foco em acessibilidade e compatibilidade.

API backend desenvolvida em **Node.js** com **Express** e **PostgreSQL**, utilizando **Prisma ORM** para modelagem de dados e migrations.  

## 🛠️ Tecnologias UtilizadasEste projeto faz parte do curso **TIC 2025** e tem como objetivo consolidar boas práticas no desenvolvimento de **APIs modernas**.  



- **Node.js** - Runtime JavaScript## 🎯 Objetivo

- **TypeScript** - Linguagem de programação

- **Express** - Framework webFornecer uma API escalável e bem estruturada para consumo por aplicações frontend, abordando:  

- **Prisma ORM** - ORM para PostgreSQL- Desenvolvimento backend com **Node.js + Express**  

- **PostgreSQL** - Banco de dados- Persistência de dados em **PostgreSQL** com **Prisma ORM**  

- **JWT** - Autenticação- Organização de rotas, controladores e middlewares  

- **Bcrypt** - Criptografia de senhas- Uso de **TypeScript** para tipagem e segurança

- **Multer** - Upload de arquivos

- **Sharp** - Processamento de imagens## 🚀 Tecnologias Utilizadas

- **Nodemailer** - Envio de emails

- **Node.js 20.x** – Runtime JavaScript  

## 📦 Instalação- **Express 4.x** – Framework minimalista para APIs  

- **TypeScript** – Superset de JavaScript com tipagem estática  

### Pré-requisitos- **Prisma 5.x** – ORM moderno para PostgreSQL  

- **PostgreSQL 16** – Banco de dados relacional  

- Node.js 20+ - **ts-node-dev / tsx** – Execução e hot reload de TypeScript  

- PostgreSQL 14+

- npm ou yarn## 📁 Estrutura do Projeto



### Passos```

tic-2025-back/

```bash│

# Clone o repositório├── prisma/ # Configuração do Prisma e migrations

git clone <url-do-repositorio>│ └── schema.prisma # Definição do banco de dados

│

# Navegue até a pasta do backend├── src/

cd back/tic-2025-back│ ├── controllers/ # Regras de negócio e lógica da aplicação

│ ├── middlewares/ # Middlewares (auth, validações, logs, etc.)

# Instale as dependências│ ├── routes/ # Definição das rotas da API

npm install│ ├── services/ # Serviços auxiliares (ex: autenticação)

│ ├── utils/ # Funções utilitárias

# Configure as variáveis de ambiente│ ├── index.ts # Ponto de entrada da aplicação

cp .env.example .env│ └── server.ts # Configuração do servidor Express

│

# Configure a URL do banco de dados no .env├── .env # Variáveis de ambiente (DATABASE_URL, etc.)

DATABASE_URL="postgresql://usuario:senha@localhost:5432/tic2025"├── package.json # Dependências e scripts

JWT_SECRET="seu-secret-key"└── tsconfig.json # Configuração do TypeScript

```

# Execute as migrations

npx prisma migrate deploy## 🛠️ Instalação e Configuração



# Popule o banco com dados iniciais### Pré-requisitos

npm run seed- **Node.js** (>= 20)  

- **PostgreSQL** (>= 16)  

# Inicie o servidor de desenvolvimento- **npm** ou **yarn**  

npm run dev

```### Passos

```bash

## 🗄️ Estrutura do Banco de Dados# Clone o repositório

git clone https://github.com/t4Facef/tic-2025-back.git

### Principais Entidades

# Acesse a pasta

#### **Candidato**cd tic-2025-back

- Informações pessoais (nome, email, CPF, telefone)

- Endereço completo# Instale as dependências

- Área de interessenpm install

- Habilidades

- Subtipos de deficiência# Configure as variáveis de ambiente

- Formações acadêmicascp .env.example .env

- Experiências profissionais```

- Arquivos (currículo, laudo, foto)

Edite o arquivo .env com a sua conexão PostgreSQL, por exemplo:

#### **Empresa**

- Razão social e nome fantasia```ini

- CNPJ e contatosDATABASE_URL="postgresql://usuario:senha@localhost:5432/tic2025"

- Informações corporativas (missão, visão, valores)```

- Número de funcionários e PcDs

- Acessibilidades oferecidas## 🗄️ Banco de Dados e Prisma

- Endereço

- Vagas publicadasRodar migrations para criar as tabelas no PostgreSQL:

- Arquivos (foto de perfil)

```bash

#### **Vagas**npx prisma migrate dev --name init

- Título e descrição```

- Localização e tipo de trabalho

- Habilidades requeridasVisualizar o banco de dados com Prisma Studio:

- Apoios oferecidos

- Acessibilidades necessárias```bash

- Datas (início/fim)npx prisma studio

- Status (DISPONÍVEL/ENCERRADA)```

- Score de compatibilidade com candidatos

## 🚀 Scripts Disponíveis

#### **Sistema de Acessibilidade**

- **Tipos de Deficiência**: Visual, Auditiva, Física, Intelectual```bash

- **Subtipos**: Categorização específica de cada tipo# Inicia o servidor em modo desenvolvimento

- **Barreiras**: Obstáculos identificados (comunicação, mobilidade, tecnologia)npm run dev

- **Acessibilidades**: Recursos para superar barreiras (intérprete, rampas, software adaptativo)

- **Relações**: Mapeamento entre barreiras e acessibilidades# Compila o TypeScript

npm run build

#### **Notificações**

- Sistema de notificações para candidatos e empresas# Inicia o servidor em produção

- Notificações de candidaturasnpm start

- Avisos gerais do sistema

- Status de leitura# Executa migrations do Prisma

npm run migrate

## 🔌 API Endpoints```



### 🔐 Autenticação## 📱 Endpoints Principais

(exemplo de possíveis endpoints – ajuste conforme suas rotas)

```- POST /auth/register → Registro de usuário

POST   /api/auth/register/candidato    # Cadastro de candidato- POST /auth/login → Login e geração de token JWT

POST   /api/auth/register/empresa      # Cadastro de empresa- GET /users → Lista todos os usuários

POST   /api/auth/login                 # Login- GET /users/:id → Detalhes de um usuário específico

POST   /api/auth/reset-password        # Solicitar reset de senha- POST /items → Criação de item

POST   /api/auth/reset-password/new    # Definir nova senha- GET /items → Listagem de itens

GET    /api/auth/me                    # Dados do usuário logado

```## 🔧 Desenvolvimento



### 👤 Candidatos- ✅ Estrutura base do projeto configurada

- ✅ Conexão com PostgreSQL via Prisma

```- ✅ Organização em rotas, controllers e middlewares

GET    /api/candidatos                 # Listar todos- ✅ Variáveis de ambiente com .env

GET    /api/candidatos/:id             # Buscar por ID- 🚧 Autenticação com JWT (em desenvolvimento)

PUT    /api/candidatos/:id             # Atualizar dados- 🚧 Testes automatizados (planejado)

DELETE /api/candidatos/:id             # Deletar candidato

GET    /api/candidatos/:id/formacoes   # Listar formações## 🧪 Testes

POST   /api/candidatos/:id/formacoes   # Adicionar formação

GET    /api/candidatos/:id/experiencias # Listar experiênciasAdicionar testes com Jest ou Vitest (planejado):

POST   /api/candidatos/:id/experiencias # Adicionar experiência```bash

```npm run test

```

### 🏢 Empresas

## 📦 Deploy

```

GET    /api/empresas                   # Listar todasSugestões de deploy:

GET    /api/empresas/:id               # Buscar por ID

PUT    /api/empresas/:id               # Atualizar dados- Render ou Railway (deploy gratuito e simples)

DELETE /api/empresas/:id               # Deletar empresa- Docker para containerização do backend e banco PostgreSQL

GET    /api/empresas/:id/vagas         # Listar vagas da empresa

POST   /api/empresas/:id/acessibilidades # Adicionar acessibilidades## 🤝 Contribuição

```

1. Faça um fork do projeto

### 💼 Vagas2. Crie uma branch para sua feature (git checkout -b feature/nova-feature)

3. Commit suas mudanças (git commit -m 'Adiciona nova feature')

```4. Push para a branch (git push origin feature/nova-feature)

GET    /api/vagas                      # Listar todas (com filtros)5. Abra um Pull Request

GET    /api/vagas/:id                  # Buscar por ID

POST   /api/vagas                      # Criar vaga## 🎓 Contexto Acadêmico

PUT    /api/vagas/:id                  # Atualizar vaga

DELETE /api/vagas/:id                  # Deletar vagaProjeto desenvolvido como trabalho acadêmico para o curso TIC 2025, com foco em:

PATCH  /api/vagas/:id/status           # Alterar status- Desenvolvimento de APIs modernas

GET    /api/vagas/:id/candidaturas     # Listar candidaturas- Banco de dados relacionais com PostgreSQL

```- ORM com Prisma

- Boas práticas de organização backend

**Filtros disponíveis:**

- `localizacao` - Cidade/Estado---

- `tipoContrato` - CLT, PJ, Estágio, Temporário

- `tipoTrabalho` - Presencial, Remoto, Híbrido**Apojobs** - Conectando talentos às oportunidades certas.
- `nivelTrabalho` - Júnior, Pleno, Sênior
- `turno` - Manhã, Tarde, Noite, Integral
- `pagamento` - Faixa salarial
- `habilidades` - Habilidades requeridas
- `acessibilidades` - Recursos de acessibilidade

### 📝 Candidaturas

```
GET    /api/candidaturas               # Listar todas
POST   /api/candidaturas               # Criar candidatura
PUT    /api/candidaturas/:id/status    # Atualizar status
GET    /api/candidaturas/candidato/:id # Por candidato
GET    /api/candidaturas/vaga/:id      # Por vaga
```

**Status:** `PENDENTE`, `APROVADO`, `RECUSADO`

### 🎯 Compatibilidade

```
POST   /api/compatibilidade/calcular   # Calcular match candidato-vaga
```

Algoritmo considera:
- Habilidades correspondentes
- Acessibilidades necessárias vs oferecidas
- Experiência e formação
- Localização

### 📊 Estatísticas

```
GET    /api/estatisticas/geral         # Estatísticas gerais do sistema
GET    /api/estatisticas/candidato/:id # Estatísticas do candidato
GET    /api/estatisticas/empresa/:id   # Estatísticas da empresa
```

Retorna:
- Total de usuários, vagas, candidaturas
- Taxa de aprovação
- Distribuição por tipo de deficiência
- Vagas por região
- E mais...

### 🔔 Notificações

```
GET    /api/notificacoes               # Listar notificações do usuário
POST   /api/notificacoes               # Criar notificação
PATCH  /api/notificacoes/:id/lida      # Marcar como lida
GET    /api/notificacoes/nao-lidas     # Contar não lidas
```

### 🛡️ Administrador

```
POST   /api/admin/login                # Login admin
GET    /api/admin/estatisticas         # Estatísticas completas
DELETE /api/admin/usuarios/:id         # Remover usuário
```

### 📁 Arquivos

```
POST   /api/arquivos/candidato/:id/curriculo    # Upload currículo
POST   /api/arquivos/candidato/:id/laudo        # Upload laudo
POST   /api/arquivos/candidato/:id/foto         # Upload foto
GET    /api/arquivos/candidato/:id/foto/view    # Visualizar foto (público)
POST   /api/arquivos/empresa/:id/foto           # Upload logo empresa
GET    /api/arquivos/empresa/:id/foto/view      # Visualizar logo (público)
GET    /api/arquivos/candidato/:id/curriculo/download # Download currículo
```

### 🧩 Tipos e Subtipos de Deficiência

```
GET    /api/tipos                      # Listar tipos de deficiência
GET    /api/subtipos                   # Listar subtipos
POST   /api/candidato-subtipo          # Associar subtipo ao candidato
```

### ♿ Acessibilidades e Barreiras

```
GET    /api/acessibilidades            # Listar acessibilidades
GET    /api/barreiras                  # Listar barreiras
GET    /api/barreiras/:subtipoId       # Barreiras por subtipo
GET    /api/acessibilidades/:barreiraId # Acessibilidades por barreira
```

## 🔒 Autenticação e Autorização

### Middleware de Autenticação

Todas as rotas protegidas requerem token JWT no header:

```
Authorization: Bearer <seu-token-jwt>
```

### Tipos de Usuário

- **Candidato**: Acesso a candidaturas, vagas, perfil próprio
- **Empresa**: Acesso a vagas próprias, candidaturas, perfil próprio
- **Administrador**: Acesso total ao sistema

## 📤 Upload de Arquivos

### Tipos Suportados

- **Currículo**: PDF (máx 5MB)
- **Laudo Médico**: PDF (máx 5MB)
- **Foto de Perfil**: JPG, PNG (máx 2MB, redimensionada para 500x500)

### Estrutura de Pastas

```
uploads/
├── candidatos/
│   └── {candidatoId}/
│       ├── curriculo.pdf
│       ├── laudo.pdf
│       └── foto.jpg
├── empresas/
│   └── {empresaId}/
│       └── foto.jpg
└── profile-default.jpg
```

## 🧪 Seeders

O comando `npm run seed` popula o banco com:

- 4 tipos de deficiência
- 20+ subtipos
- 30+ barreiras
- 50+ acessibilidades
- Relações entre barreiras e acessibilidades
- 1 administrador padrão

## 🔄 Migrations

Histórico de migrations implementadas:

1. **new1** - Estrutura inicial
2. **update_schema_api_front_new_new** - Atualização do schema
3. **acessibilidade_empresa_model** - Acessibilidades da empresa
4. **create_arquivo_relations** - Sistema de arquivos
5. **add_ano_fundacao** - Ano de fundação
6. **adicao_msg_candidatura** - Mensagem na candidatura
7. **add_filepath_optional** - FilePath opcional
8. **tabelas_de_notificacao** - Sistema de notificações
9. **add_admin_and_notifications** - Admin e notificações completas

## 🚀 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento com hot reload
npm run build    # Compila TypeScript para JavaScript
npm start        # Inicia servidor de produção
npm run seed     # Popula banco de dados
npx prisma studio # Interface visual do banco
```

## 🌐 Variáveis de Ambiente

```env
# Banco de dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/tic2025"

# JWT
JWT_SECRET="seu-secret-key-super-seguro"

# Email (Nodemailer)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASS="sua-senha-app"

# Servidor
PORT=3001
NODE_ENV="development"
```

## 📁 Estrutura do Projeto

```
tic-2025-back/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   ├── seed.ts                # Dados iniciais
│   └── migrations/            # Histórico de migrations
├── src/
│   ├── controllers/           # Lógica de negócio
│   │   ├── auth.controller.ts
│   │   ├── candidato.controller.ts
│   │   ├── empresa.controller.ts
│   │   ├── vagas.controller.ts
│   │   ├── candidaturas.controller.ts
│   │   ├── notificacoes.controller.ts
│   │   ├── arquivo.controller.ts
│   │   └── ...
│   ├── middleware/            # Middlewares
│   │   ├── auth.middleware.ts
│   │   └── upload.ts
│   ├── repositories/          # Acesso ao banco
│   │   ├── prisma.ts
│   │   └── ...
│   ├── routes/                # Definição de rotas
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── candidato.routes.ts
│   │   └── ...
│   ├── services/              # Serviços auxiliares
│   └── server.ts              # Configuração do servidor
├── uploads/                   # Arquivos enviados
├── package.json
├── tsconfig.json
└── README.md
```

## 📈 Funcionalidades Implementadas

### ✅ Autenticação e Autorização
- Registro de candidatos e empresas
- Login com JWT
- Middleware de autenticação
- Reset de senha por email
- Perfis de acesso (candidato, empresa, admin)

### ✅ Gestão de Candidatos
- CRUD completo
- Formações acadêmicas
- Experiências profissionais
- Habilidades
- Tipos e subtipos de deficiência
- Upload de currículo, laudo e foto

### ✅ Gestão de Empresas
- CRUD completo
- Informações corporativas
- Acessibilidades oferecidas
- Upload de logo
- Listagem de vagas

### ✅ Sistema de Vagas
- CRUD completo
- Filtros avançados
- Status (disponível/encerrada)
- Acessibilidades requeridas
- Listagem de candidaturas

### ✅ Sistema de Candidaturas
- Candidatura com mensagem
- Status (pendente/aprovado/recusado)
- Notificações automáticas
- Histórico completo

### ✅ Compatibilidade e Match
- Algoritmo de cálculo de compatibilidade
- Score baseado em múltiplos fatores
- Recomendações personalizadas

### ✅ Sistema de Notificações
- Notificações para candidatos e empresas
- Status de leitura
- Contador de não lidas
- Notificações de candidatura

### ✅ Sistema de Acessibilidade
- Tipos de deficiência
- Subtipos detalhados
- Barreiras identificadas
- Soluções de acessibilidade
- Mapeamento completo

### ✅ Estatísticas e Relatórios
- Dashboard geral do sistema
- Estatísticas por candidato
- Estatísticas por empresa
- Métricas de aprovação

### ✅ Upload de Arquivos
- Currículos em PDF
- Laudos médicos
- Fotos de perfil com redimensionamento
- Armazenamento organizado

### ✅ Painel Administrativo
- Login de administrador
- Visualização de estatísticas
- Gerenciamento de usuários

## 🐛 Tratamento de Erros

A API retorna erros padronizados:

```json
{
  "error": "Mensagem de erro descritiva",
  "details": "Detalhes adicionais (quando aplicável)"
}
```

Códigos HTTP utilizados:
- `200` - Sucesso
- `201` - Criado
- `400` - Requisição inválida
- `401` - Não autenticado
- `403` - Não autorizado
- `404` - Não encontrado
- `500` - Erro interno

## 🔧 Melhorias Futuras

- [ ] WebSockets para notificações em tempo real
- [ ] Sistema de chat entre candidato e empresa
- [ ] Análise de currículo com IA
- [ ] Integração com LinkedIn
- [ ] Sistema de avaliações e feedback
- [ ] Relatórios em PDF
- [ ] API rate limiting
- [ ] Cache com Redis
- [ ] Testes automatizados (Jest)
- [ ] CI/CD pipeline
- [ ] Documentação com Swagger

## 📝 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do curso TIC 2025.

---

**Desenvolvido com ❤️ para promover inclusão no mercado de trabalho**
