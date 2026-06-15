# Estrutura do Backend (NestJS)

## Padrão MVC e Organização

O NestJS é um framework focado em escalabilidade e arquitetura limpa. Diferente de scripts simples, ele possui regras claras de onde cada código deve morar. 

### Arquivos Principais

* `src/app.module.ts`: O módulo raiz da aplicação.
* `src/main.ts`: O ponto de entrada que inicia o servidor.

### Domínios do Sistema (`src/modules/`)

Cada funcionalidade do nosso sistema de presença vive isolada em seu próprio módulo. Isso evita que um erro na tela de alunos quebre a tela de autenticação.

* `auth/`: Autenticação e autorização (Login seguro).
* `alunos/`: Cadastro, edição e remoção de alunos.
* `turmas/`: Gerenciamento das turmas práticas e limites de vagas.
* `aulas/`: Registro das sessões laboratoriais e horários.
* `frequencias/`: O núcleo do sistema, com lançamento e histórico de presenças.

---

## ⚙️ A Anatomia de um Módulo NestJS

Pense no nosso backend como um grande restaurante. O arquivo `main.ts` é a porta da frente. O `app.module.ts` é o gerente geral. Dentro da pasta `modules/`, nós dividimos o sistema por "estações de trabalho". 

Em cada estação, você sempre encontrará estes arquivos vitais:

### 1. O Garçom (`*.controller.ts`)
Ele fica na linha de frente recebendo requisições HTTP (`GET`, `POST`, `PUT`, `DELETE`). Sua única função é anotar o pedido do Frontend, repassar para a cozinha (o Service) e devolver a resposta final para o cliente. Ele não resolve regras de negócio.

### 2. O Chef de Cozinha (`*.service.ts`)
Aqui é onde a mágica acontece. O Service detém as regras do produto. Ele verifica se o aluno existe, calcula a taxa de falta, impede duplicação de presença e interage com o banco de dados para salvar as informações.

### 3. A Caixa de Transporte (`*.module.ts`)
Ele empacota o Controller e o Service daquela funcionalidade juntos, permitindo que o gerente geral (`app.module.ts`) importe a funcionalidade inteira com facilidade.

### 4. O Cardápio e o Segurança (`*.dto.ts` e `entities/`)
* **DTO (Data Transfer Object):** É a regra de validação. Se o frontend tentar criar um aluno sem enviar o nome, o DTO barra a requisição antes mesmo de chegar no Controller.
* **Entities:** São as representações exatas das nossas tabelas do banco de dados (PostgreSQL/MongoDB) dentro do código TypeScript.

---

## Exemplo Prático de Rotas da API

Para consumir esses dados no site, o time de front-end fará chamadas para estas URLs padrão:

* `GET /turmas`: Lista todas as turmas.
* `POST /turmas`: Cria uma turma nova.
* `GET /turmas/:id/alunos`: Traz os alunos de uma turma específica.
* `POST /frequencias`: Registra a presença de um estudante.
* `GET /relatorios/aluno/:id`: Retorna o percentual de faltas de um aluno.
