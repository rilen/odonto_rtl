// Salvar em: README.md
# Odonto RTL

Sistema web para clínicas odontológicas, com funcionalidades para administração, agendamento, finanças, odontograma, estoque, marketing, manutenção, visitantes e satisfação do paciente.

## Tecnologias
- **Frontend**: React, Tailwind CSS, Chart.js, jsPDF
- **Backend**: Node.js, Express, PostgreSQL (Supabase)
- **PWA**: Service Worker para suporte offline
- **Notificações**: Nodemailer (email), Twilio (WhatsApp)
- **Cache**: Node-cache para otimização
- **Testes**: Mocha, Chai, Supertest

## Instalação
1. **Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm run build`
   - Deploy para GitHub Pages: `git subtree push --prefix frontend/build origin gh-pages`
2. **Backend**:
   - `cd backend`
   - `npm install`
   - Configure `.env` com `DATABASE_URL`, `TWILIO_SID`, `TWILIO_TOKEN`, `TWILIO_PHONE`, `INSTAGRAM_TOKEN`, `EMAIL_USER`, `EMAIL_PASS`
   - Deploy no Vercel/Render
3. **Banco de Dados**:
   - Configure PostgreSQL no Supabase
   - Execute `database.js` para criar tabelas
4. **Testes**:
   - `npm install mocha chai supertest --save-dev`
   - `npx mocha tests/*.test.js`
5. **Backup**:
   - Execute `node scripts/backup.js` para backups diários

## Funcionalidades
- **Admin**: Gerenciamento de usuários e permissões
- **Secretaria**: Agendamento, finanças, estoque, manutenção, marketing, relatórios
- **Financeiro**: Pagamentos, contas a pagar, relatórios financeiros
- **Dentista**: Odontograma interativo, anamnese, manutenção
- **Paciente**: Login com CPF, recuperação de senha, agendamento, satisfação
- **Visitante**: Formulário de avaliação com notificações
- **Offline**: PWA com sincronização de agendamentos
- **Relatórios**: Pacientes, finanças, satisfação, manutenção (PDF)

## Implantação
- **Frontend**: GitHub Pages
- **Backend**: Vercel/Render
- **Banco de Dados**: Supabase (free tier)
