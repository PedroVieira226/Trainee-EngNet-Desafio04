# Estrutura do Frontend (Next.js)

## 🖥️ Entendendo o Next.js (App Router)

O Next.js é o framework que cuida de toda a interface visual e da experiência do usuário. Tudo acontece dentro da pasta principal `frontend/src/`.

### O Roteamento Automático (`app/`)
Cada pasta criada aqui dentro se transforma automaticamente em uma página acessível no navegador.
* `auth/`: Gera a tela `nosso-site.com/auth` (Login).
* `dashboard/`: Gera a tela `nosso-site.com/dashboard` (Painel com indicadores).
* `turmas/`: Gera a tela `nosso-site.com/turmas` (Listagem geral).

### As Peças de Lego (`components/`)
Onde guardamos os itens visuais reutilizáveis. Se criamos um botão com a paleta roxa, uma tabela de alunos ou um aviso de erro (Toast), nós salvamos aqui. Isso impede a duplicação de código e garante que o design seja o mesmo em todo o sistema.

### Entrega de Dados (`services/`)
Aqui ficam os arquivos responsáveis por fazer as requisições HTTP (usando `fetch` ou `axios`) para a nossa API do NestJS. O Front-end nunca fala com o banco de dados diretamente, ele sempre pede ao `services/api.ts` para buscar a informação.

### Regras Visuais e Tipagem (`hooks/` e `types/`)
* **`hooks/`**: Onde criamos lógicas customizadas do React, como um `useAuth` para verificar se o professor está logado, ou um controle de modal de confirmação.
* **`types/`**: Arquivos que dizem ao TypeScript qual é o formato exato de um Aluno ou de uma Turma, evitando erros de variáveis indefinidas.

### CSS (`styles/`)
Onde definimos as cores globais, importamos as fontes e ajustamos as configurações centrais do Tailwind CSS para toda a plataforma.

---

## 🚀 Resumo Prático para o Dia a Dia

* Precisa criar uma nova **tela**? 👉 `frontend/src/app/`
* Precisa alterar a cor de um **botão**? 👉 `frontend/src/components/`
* Precisa consumir uma **nova rota do NestJS**? 👉 `frontend/src/services/`
* Precisa criar o **formato de dados** do aluno? 👉 `frontend/src/types/`

## Boas Práticas do Time

* Foque em criar componentes de UI reutilizáveis, principalmente formulários e cartões de exibição.
* Centralize a URL da API e todas as chamadas externas no arquivo `services/apiCLient.ts`.
* Utilize o Tailwind CSS seguindo os padrões de responsividade (Mobile First).
* Pense na experiência de uso: o diferencial é garantir um tema visual confortável e navegação fluida em celulares e tablets.
