# Histórias de Usuário, DoR e DoD

Para manter a agilidade e o foco nas entregas, as funcionalidades do sistema foram mapeadas em Histórias de Usuário. Ao final do documento, definimos nossos critérios de **Definition of Ready (DoR)** e **Definition of Done (DoD)** para se adequar ao projeto.

## 1. Histórias de Usuário (User Stories)

| ID | História de Usuário | Critérios de Aceitação (AC) | Rastreiabilidade |
| :--- | :--- | :--- | :--- |
| **US01** | Como professor/administrador, quero **autenticar no sistema** usando e-mail e senha, para acessar a plataforma de forma segura. | 1. O sistema deve validar e-mail e senha no banco.<br>2. Exibir mensagem clara em caso de erro.<br>3. Proteger rotas internas, exigindo token ativo. | **CP3**, **OE2** |
| **US02** | Como usuário autenticado, quero **visualizar um dashboard principal**, para acompanhar as estatísticas gerais de frequência e alunos. | 1. Exibir quantidade total de alunos e de aulas.<br>2. Calcular e mostrar a taxa média de presença geral.<br>3. Exibir alertas para turmas/alunos com frequência abaixo de 75%. | **CP1**, **OE5** |
| **US03** | Como administrador, quero **gerenciar turmas** (cadastrar, editar, remover e visualizar), para manter as informações acadêmicas atualizadas. | 1. Cadastro deve exigir nome, código e horário da turma.<br>2. Edição deve refletir imediatamente no sistema.<br>3. Exclusão deve exibir um modal de confirmação para evitar perdas acidentais.<br>4. Deve exibir a lista completa de alunos associados à turma. | **CP1**, **OE3** |
| **US04** | Como professor, quero **registrar nova aula e listar alunos**, para não precisar mais de listas de papel na chamada. | 1. Permitir registro da aula informando a data/hora.<br>2. Exibir a lista de alunos da turma com opções visíveis de presença. | **CP2**, **OE1** |
| **US05** | Como professor, quero **realizar o apontamento de presença/falta e finalizar a chamada**, para concluir o registro diário de frequência da disciplina. | 1. Permitir marcar alunos como presentes ou ausentes com um clique.<br>2. Salvar os dados definitivamente, atualizando o cálculo geral de presença. | **CP2**, **OE1** |
| **US06** | Como administrador/professor, quero **validar a chamada de forma segura**, para evitar fraudes onde alunos validam a presença por colegas. | 1. Impedir que contas de alunos validem ou alterem a própria chamada.<br>2. Exigir o login e validação do professor para salvar os apontamentos. | **CP3**, **OE2** |
| **US07** | Como gestor/professor, quero **consultar o percentual e histórico de frequência individual**, para acompanhar detalhadamente o rendimento do estudante. | 1. Exibir todo o histórico de presenças/faltas de um aluno específico.<br>2. Calcular e exibir o percentual exato de frequência. | **CP4**, **OE4** |
| **US08** | Como gestor/professor, quero **consultar a lista de faltosos e histórico global da turma**, para intervir preventivamente contra a evasão ou reprovação. | 1. Destacar alunos que estão abaixo de uma frequência mínima (ex: 75%).<br>2. Mostrar um histórico consolidado com as aulas da turma e as ausências. | **CP4**, **OE4** |

---

## 2. DoR e DoD

Checklists de **Definition of Ready (DoR)** e **Definition of Done (DoD)** adaptados para o contexto do projeto. 

### 2.1. DoR (Ready) - Pronto para Iniciar

Um item está pronto para o desenvolvimento se as seguintes condições forem satisfeitas (resposta "Sim"):

- [ ] **Clareza de Escopo:** O "o quê" e o "por quê" da tarefa (requisito/funcionalidade) estão claros para o desenvolvedor responsável?
- [ ] **Critérios de Aceitação (AC):** Os critérios de aceitação foram definidos, estão compreendidos e associados aos OEs e CPs correspondentes?
- [ ] **Viabilidade Técnica:** As dependências do código (ex: estrutura de banco, API necessária) foram mapeadas e não há impedimentos para começar?
- [ ] **Tamanho:** O escopo cabe de forma realista na Sprint de desenvolvimento atual?

### 2.2. DoD (Done) - Pronto para Entregar

Para que um item saia do fluxo de desenvolvimento como "Concluído", ele deve obrigatoriamente satisfazer estas barreiras de qualidade técnica e de negócio:

- [ ] **Completude Funcional (ACs):** O código atende integralmente a todos os Critérios de Aceitação definidos na História de Usuário.
- [ ] **Tratamento de Erros Básicos:** Fluxos alternativos (ex: dados inválidos, instabilidade) possuem tratamentos simples com feedback visual amigável ao usuário.
- [ ] **Revisão de Código (Code Review):** Pelo menos um outro membro da equipe revisou visualmente a alteração no código (*Pull Request*) ou validou o comportamento da tela, garantindo ausência de erros grosseiros.
- [ ] **Integração Contínua:** O código foi integrado na branch `main` sem conflitos estruturais, mantendo a separação entre Frontend (Next.js) e Backend (NestJS).
- [ ] **Deploy Bem-sucedido:** A funcionalidade testada e aprovada está implantada (*deploy*) e rodando com sucesso no ambiente final de entrega.
