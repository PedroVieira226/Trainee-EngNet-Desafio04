# Processo de Descoberta e Levantamento de Requisitos

## Contexto
Durante a fase inicial do projeto, a equipe realizou reuniões de alinhamento e discussão da proposta apresentada pelo cliente. A partir dessas reuniões foram identificados os principais problemas, necessidades dos usuários e requisitos do sistema.
Os artefatos apresentados nesta seção representam a consolidação das decisões tomadas pela equipe durante o processo de análise e definição da solução.

---

## 1. Matriz CSD

**Objetivo**: Organizar os conhecimentos obtidos durante as discussões iniciais do projeto.

### Certezas
- O processo atual de controle de presença é manual.
- Existem fraudes no registro de frequência.
- O cliente deseja eliminar o uso de papel.
- É necessário gerar relatórios de frequência.

### Suposições
- Os professores possuem acesso a computador ou celular durante as aulas.
- O sistema reduzirá significativamente o tempo gasto com chamadas.
- A autenticação ajudará a reduzir fraudes.

### Dúvidas
- Quantas turmas utilizarão o sistema simultaneamente?
- O cliente precisará exportar relatórios em PDF?

**Ferramenta utilizada**: Discussões em Google Meet e documentação do projeto.

---

## 2. Perfis de Usuários e Personas

**Objetivo**: Identificar os principais usuários do sistema e compreender suas necessidades, dificuldades e objetivos, garantindo que as funcionalidades desenvolvidas estejam alinhadas ao contexto de uso da plataforma.

As personas apresentadas abaixo foram construídas a partir dos perfis identificados durante as discussões e reuniões de levantamento de requisitos realizadas pela equipe.

### Perfil 1 – Professor
- **Descrição Geral**: Responsável por ministrar aulas práticas e laboratoriais, realizar chamadas e acompanhar a frequência dos estudantes.
- **Principais Responsabilidades**: 
  - Registrar presença e faltas.
  - Consultar histórico de frequência.
  - Acompanhar indicadores da turma.
- **Necessidades**: 
  - Processo rápido de chamada.
  - Redução de tarefas administrativas.
  - Dados confiáveis sobre frequência.
- **Principais Dificuldades**: 
  - Uso de listas impressas.
  - Possibilidade de fraudes.
  - Erros manuais no lançamento de presença.

### Perfil 2 – Administrador Acadêmico
- **Descrição Geral**: Responsável pelo gerenciamento/controle das turmas, acompanhamento dos alunos e emissão de relatórios institucionais.
- **Principais Responsabilidades**: 
  - Gerenciar turmas e estudantes.
  - Monitorar indicadores de frequência.
  - Emitir relatórios acadêmicos.
- **Necessidades**: 
  - Visão consolidada dos dados.
  - Facilidade de gerenciamento.
  - Relatórios precisos e atualizados.
- **Principais Dificuldades**: 
  - Consolidação manual das informações.
  - Processos administrativos repetitivos.
  - Dificuldade de acompanhamento em larga escala.

**Conclusão**: A identificação desses perfis orientou a definição das funcionalidades prioritárias do sistema, especialmente os módulos de autenticação, gestão de turmas, controle digital de presença e geração de relatórios.

---

## 3. Benchmarking

**Objetivo**: Analisar soluções semelhantes para identificar boas práticas.

| Critério / Concorrente | SIGAA UNB |
| :--- | :--- |
| **Funcionalidades Observadas** | Gerenciamento de turmas e alunos, lançamento de frequências. Telas de login. |
| **Diferenciais** | Permite que o aluno consulte histórico acadêmico, documentos e realize solicitações diretamente pelo sistema, reduzindo a necessidade de atendimento presencial na secretaria. |
| **Pontos Fortes** | Alta escalabilidade para atender grande quantidade de usuários e turmas.<br>Integração com diversos processos acadêmicos da instituição.<br>Centralização de informações acadêmicas em uma única plataforma.<br>Ampla cobertura de funcionalidades administrativas e educacionais. |
| **Pontos Fracos** | Interface pode ser pouco intuitiva para usuários iniciantes.<br>Navegação exige múltiplos passos para executar determinadas ações.<br>Experiência do usuário pode ser comprometida pelo excesso de funcionalidades. |
| **Feedback de Usuários** | Amplamente utilizado em instituições de ensino superior.<br>Considerado robusto e confiável para gestão acadêmica.<br>Bem avaliado para ambientes com grande volume de alunos e turmas.<br>Usuários relatam que o sistema é completo, porém poderia ter uma interface mais moderna e intuitiva. |
| **Observações Gerais** | Apresenta visualizações gráficas de indicadores acadêmicos, demonstrando boas práticas de exibição de dados que podem ser adaptadas para os relatórios de frequência da solução proposta. |

### Aprendizados Obtidos
- Sistemas acadêmicos centralizados facilitam o gerenciamento de informações e reduzem retrabalho administrativo.
- A disponibilidade de relatórios e indicadores visuais auxilia professores e gestores na tomada de decisão.
- Funcionalidades muito complexas podem dificultar a experiência do usuário e aumentar o tempo de treinamento.
- O acesso remoto a informações acadêmicas reduz a necessidade de atendimentos presenciais e melhora a autonomia dos usuários.
- Interfaces simples e objetivas tendem a aumentar a produtividade dos usuários em tarefas recorrentes, como registro de presença.

### Aplicação no Projeto
- Desenvolver uma plataforma centralizada para gerenciamento de turmas, alunos e frequência.
- Implementar dashboards e relatórios que permitam acompanhar indicadores de presença de forma rápida e intuitiva.
- Priorizar uma interface simples e de fácil utilização para professores e administradores.
- Disponibilizar histórico e informações acadêmicas diretamente na plataforma, reduzindo processos manuais.
- Utilizar gráficos e indicadores visuais inspirados em soluções já consolidadas no mercado acadêmico, adaptados ao contexto de controle de frequência.
- Estruturar o sistema de forma escalável, permitindo futuras expansões e novas funcionalidades sem comprometer a organização do projeto.
