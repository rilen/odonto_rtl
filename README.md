odonto-rtl/
│── frontend/                   # Interface do usuário
│   ├── public/                  # Arquivos estáticos (favicon, manifest.json)
│   ├── src/                     # Código-fonte
│   │   ├── assets/              # Imagens, ícones, estilos globais
│   │   ├── components/          # Componentes reutilizáveis (botões, inputs, cards)
│   │   ├── contexts/            # Context API para estado global
│   │   ├── hooks/               # Custom Hooks para reaproveitamento de lógica
│   │   ├── pages/               # Telas da aplicação (Login, Dashboard, etc.)
│   │   ├── services/            # Comunicação com backend (API, autenticação)
│   │   ├── utils/               # Funções auxiliares (formatadores, validações)
│   │   ├── App.tsx              # Componente raiz da aplicação
│   │   ├── index.tsx            # Ponto de entrada React
│   ├── package.json             # Dependências e scripts do projeto
│   ├── tsconfig.json            # Configuração TypeScript
│   ├── vite.config.ts            # Configuração do Vite (se estiver usando Vite)
│── backend/                     # Lógica do servidor
│   ├── src/                     # Código-fonte
│   │   ├── controllers/         # Regras de negócio (agendamento, financeiro)
│   │   ├── middlewares/         # Autenticação, validação de dados, logs
│   │   ├── models/              # Definição de tabelas do banco (Sequelize, Prisma)
│   │   ├── routes/              # Rotas da API
│   │   ├── services/            # Comunicação com outros serviços (Google Calendar, WhatsApp)
│   │   ├── utils/               # Funções auxiliares
│   │   ├── index.ts             # Ponto de entrada do backend
│   ├── package.json             # Dependências do backend
│   ├── tsconfig.json            # Configuração TypeScript
│   ├── nodemon.json             # Configuração do Nodemon (Hot reload)
│   ├── .env                     # Variáveis de ambiente
│── database/                    # Scripts para banco de dados
│   ├── migrations/              # Scripts de migração
│   ├── seeders/                 # Dados iniciais para popular tabelas
│   ├── schema.sql               # Esquema do banco (caso não use ORM)
│── docs/                        # Documentação do projeto
│   ├── API.md                   # Descrição das rotas da API
│   ├── SETUP.md                 # Como configurar o ambiente
│── tests/                       # Testes automatizados
│   ├── frontend/                # Testes do React (Jest, Testing Library)
│   ├── backend/                 # Testes de API (Jest, Supertest)
│── .gitignore                    # Arquivos ignorados pelo Git
│── README.md                     # Guia geral do projeto
