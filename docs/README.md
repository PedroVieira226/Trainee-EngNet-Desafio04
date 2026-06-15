# Como rodar o projeto localmente

Você pode iniciar o projeto de duas formas: utilizando o Docker (recomendado, pois configura o banco automaticamente) ou rodando os serviços de forma manual.

## Opção 1: Via Docker (Recomendado)

```bash
# 1. Clone o repositório e acesse a pasta
git clone https://github.com/gpaulovit/Trainee-EngNet-Desafio04.git
cd Trainee-EngNet-Desafio04

# 2. Configure as variáveis de ambiente base
cp .env.example .env

# 3. Suba a infraestrutura completa (Frontend, Backend e Banco de Dados)
docker compose up -d
```

Após os containers iniciarem, acesse:
- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **Backend (API)**: [http://localhost:3000](http://localhost:3000)

---

## Opção 2: Manualmente (Via NPM)

Para rodar manualmente, certifique-se de possuir um banco PostgreSQL local configurado com as credenciais do arquivo `.env`.

**Rodando o Backend (API):**
```bash
cd backend
npm install
npm run start:dev
```

**Rodando o Frontend:**
```bash
cd frontend
npm install
npm run dev
```