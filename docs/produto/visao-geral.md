# 1. Visão Geral do Problema

A instituição de ensino enfrenta dificuldades no controle manual de frequência em aulas práticas e laboratoriais. Os principais problemas identificados no processo atual incluem:

- Alunos assinando presença para outros colegas (fraude);
- Erros humanos no lançamento das frequências no sistema;
- Dificuldade para rastrear presenças reais;
- Excesso de papel e desperdício de recursos;
- Lentidão na geração de relatórios;
- Sobrecarga administrativa no controle de turmas e horários;
- Falta de organização em turmas com grande volume de estudantes.

O cliente deseja modernizar completamente o processo, tornando o gerenciamento de frequência mais confiável, automatizado e eficiente.

# 2. Solução Proposta

## 2.1. Objetivo geral do produto

Modernizar e automatizar o processo de controle de frequência em aulas práticas e laboratoriais de instituições de ensino, substituindo a validação manual e listas impressas por uma plataforma digital centralizada que torna o gerenciamento de frequência mais confiável, reduz a sobrecarga administrativa e fornece relatórios instantâneos e precisos.

## 2.2. Objetivos específicos (OE's)

- **OE1**: Automatizar o registro de presença, eliminando o uso de papel e processos manuais demorados.
- **OE2**: Prevenir fraudes na validação de presença (ex: alunos assinando por colegas).
- **OE3**: Centralizar a gestão de turmas, alunos e horários para as aulas práticas.
- **OE4**: Gerar relatórios instantâneos e precisos de frequência, auxiliando no acompanhamento do rendimento dos estudantes.
- **OE5**: Reduzir a sobrecarga administrativa e melhorar a organização para os professores e para a instituição de ensino.

## 2.3. Características do Produto
| ID | Característica do Produto (CP) | Descrição Resumida | ID | Valor de Negócio | Contribuição principal | Contribuição secundária | 
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | 
| CP1 | Dashboard e Gestão Centralizada | A solução deverá conter painéis e telas para visualizar dados gerais (ex: taxa média de presença) e gerenciar turmas e estudantes de forma centralizada. | VN1 | Melhoria na organização e redução da sobrecarga administrativa na alocação e acompanhamento de aulas. | OE3 | OE5 |
| CP2 | Controle Digital de Presença | A solução deverá permitir que professores realizem a chamada e registrem presenças ou faltas digitalmente no sistema. | VN2 | Agilização do processo de registro de frequência e redução de desperdício de papel e recursos operacionais. | OE1 | OE5 |
| CP3 | Sistema Antifraude e Autenticação | A solução deverá implementar métodos seguros de acesso e registro (autenticação de dados sensíveis e controle de perfis). | VN3 | Garantia da confiabilidade e integridade dos dados de presença, evitando a validação incorreta. | OE2 | OE4 |
| CP4 | Geração Automática de Relatórios | A solução deverá fornecer relatórios confiáveis com frequência individual, listas de faltosos e histórico por turma e percentuais de presença. | VN4 | Facilitação do acompanhamento acadêmico instantâneo e acesso a dados confiáveis para a instituição. | OE4 | OE5 |
| CP5 | Responsividade e Acessibilidade | A solução deverá oferecer compatibilidade e navegação otimizada em dispositivos desktop, tablet e mobile. | VN5 | Melhoria da usabilidade e facilidade de acesso ao sistema pelo professor em ambiente laboratorial/sala de aula. | OE1 | OE3 |

## 2.4 Tecnologias a Serem Utilizadas

- **Backend:** NestJS, pois é um framework Node.js maduro e escalável, ideal para construir uma API REST estruturada, com tipagem forte (TypeScript) e fácil integração com persistência de dados.
- **Frontend:** Next.js (com HTML, Tailwind CSS e JavaScript/TypeScript), pois permite a criação de interfaces modernas, performáticas e responsivas, oferecendo recursos de roteamento otimizado e componentização adequada.
- **Banco de dados:** PostgreSQL, pois oferece flexibilidade para modelagem e persistência de dados estruturados e semi-estruturados, garantindo a segurança das informações das turmas e frequências.
- **Infraestrutura:** GitHub Pages, Vercel ou Netlify, por oferecerem processos simplificados de hospedagem e CI/CD rápido e confiável para a entrega e deploy da aplicação.
