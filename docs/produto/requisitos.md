# 8. Requisitos de Software

## 8.1. Requisitos funcionais

| ID | Nome | Descrição | CP mãe | OE |
| :--- | :--- | :--- | :--- | :--- |
| **RF01** | Autenticar usuário | Validar credenciais (e-mail e senha) e gerenciar o acesso seguro do professor/administrador ao sistema. | **CP3** - Sistema Antifraude e Autenticação | **OE2** - Prevenir fraudes na validação de presença |
| **RF02** | Visualizar dashboard | Exibir painel inicial com métricas consolidadas: total de alunos, aulas, taxa média de presença e alertas de baixa frequência. | **CP1** - Dashboard e Gestão Centralizada | **OE5** - Reduzir a sobrecarga administrativa |
| **RF03** | Cadastrar turma | Permitir a criação de uma nova turma, informando nome, código, horário e quantidade de alunos. | **CP1** - Dashboard e Gestão Centralizada | **OE3** - Centralizar a gestão de turmas |
| **RF04** | Editar turma | Permitir a alteração dos dados de uma turma existente no sistema. | **CP1** - Dashboard e Gestão Centralizada | **OE3** - Centralizar a gestão de turmas |
| **RF05** | Remover turma | Permitir a exclusão de uma turma previamente cadastrada. | **CP1** - Dashboard e Gestão Centralizada | **OE3** - Centralizar a gestão de turmas |
| **RF06** | Consultar detalhes da turma | Exibir as informações completas de uma turma específica e a lista de alunos matriculados nela. | **CP1** - Dashboard e Gestão Centralizada | **OE3** - Centralizar a gestão de turmas |
| **RF07** | Registrar aula | Registrar os dados de uma aula específica, incluindo a data e o horário da ocorrência. | **CP2** - Controle Digital de Presença | **OE1** - Automatizar o registro de presença |
| **RF08** | Registrar presença | Permitir que o professor registre eletronicamente a presença de um aluno em uma aula específica. | **CP2** - Controle Digital de Presença | **OE1** - Automatizar o registro de presença |
| **RF09** | Registrar falta | Permitir que o professor registre eletronicamente a ausência de um aluno em uma aula. | **CP2** - Controle Digital de Presença | **OE1** - Automatizar o registro de presença |
| **RF10** | Validar presença de forma segura | Exigir validação digital que comprove a identidade ou impeça o registro de alunos ausentes. | **CP3** - Sistema Antifraude e Autenticação | **OE2** - Prevenir fraudes na validação de presença |
| **RF11** | Consultar histórico de turma | Exibir o histórico consolidado de chamadas e presenças de uma determinada turma. | **CP4** - Geração Automática de Relatórios | **OE4** - Gerar relatórios instantâneos e precisos |
| **RF12** | Consultar frequência individual | Gerar relatório exibindo o percentual de presença e o histórico de um aluno específico. | **CP4** - Geração Automática de Relatórios | **OE4** - Gerar relatórios instantâneos e precisos |
| **RF13** | Consultar lista de faltosos | Gerar relatório destacando os alunos que possuem baixa frequência ou faltas excedentes. | **CP4** - Geração Automática de Relatórios | **OE4** - Gerar relatórios instantâneos e precisos |

## 8.2. Requisitos não funcionais

| ID | Nome | Descrição | Classificação URPS+ | Classificação Sommerville |
| :--- | :--- | :--- | :--- | :--- |
| **RNF01** | Responsividade Web | A interface da aplicação deve adaptar-se adequadamente a resoluções desktop, tablet e mobile (a partir de 320px). | U (Usabilidade) | Produto (Usabilidade) |
| **RNF02** | Tempo de Geração de Relatórios | A geração de relatórios de frequência não deve demorar mais de 3 segundos para turmas de até 100 alunos. | P (Desempenho) | Produto (Eficiência) |
| **RNF03** | Segurança de Acesso | O sistema deve proteger rotas privadas através de autenticação, garantindo que apenas pessoas autorizadas modifiquem dados. | + (Segurança) | Produto (Segurança) |
| **RNF04** | Identidade Visual | O sistema deve incorporar a paleta de cores da empresa (preto, laranja, rosa, roxo e branco) conforme definido na prototipagem. | U (Usabilidade) | Produto (Usabilidade) |
| **RNF05** | Hospedagem em Nuvem | O Frontend deve ser publicado em plataformas de deploy contínuo, com uptime mínimo de 90%. | R (Confiabilidade) | Organizacional (Entrega) |
| **RNF06** | Manutenibilidade do Código | O código deve possuir componentização, separação de responsabilidades e ser tipado, facilitando a manutenção e legibilidade do código-fonte. | S (Suportabilidade) | Produto (Manutenibilidade) |
