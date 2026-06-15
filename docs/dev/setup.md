# Estrutura do Projeto 

Bem-vindos ao projeto do Sistema de Gestão de Presença da EngNet! 

Nós utilizamos uma arquitetura de **Monorepo**, o que significa que o nosso Front-end (a interface) e o nosso Back-end (o servidor e banco de dados) vivem dentro do mesmo repositório no GitHub, mas funcionam como sistemas independentes.

---

## A Raiz do Projeto (Visão Geral)

Quando você abre o repositório, estas são as pastas e arquivos principais que você vai encontrar:

* 📂 **`backend/`**: O motor do sistema. Construído com **NestJS**. É aqui que ficam as regras de negócio e a conexão com o banco de dados.
* 📂 **`frontend/`**: O rosto do sistema. Construído com **Next.js**. É aqui que ficam as telas, botões e a interação com o usuário.
* 📂 **`docs/`**: A nossa documentação do Docsify. Tudo o que precisamos saber sobre o projeto está aqui.
* 📄 **`docker-compose.yml`**: Com um único comando (`docker compose up`), ele liga o banco de dados, o backend e o frontend de uma só vez na sua máquina.
* 📄 **`.env.example`**: Ele mostra quais variáveis de ambiente (senhas, links de API) você precisa ter na sua máquina para o projeto rodar.

---
