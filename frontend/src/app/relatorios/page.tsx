"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import { useTurmas, Turma } from "../../hooks/useTurmas";
import { api } from "../../services/apiClient";

interface AlunoResSummary {
  id: string;
  nome: string;
  matricula: string;
}

interface AlunoFaltoso {
  id: string;
  nome: string;
  matricula?: string;
  taxaPresenca: number;
  presencas: number;
  faltas: number;
}

export default function Relatorios() {
  const router = useRouter();

  // Utilizando o hook padrão para gerenciamento de turmas
  const { turmas, carregarTurmas } = useTurmas();
  
  const [alunos, setAlunos] = useState<AlunoResSummary[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);
  const [alunoSelecionadoId, setAlunoSelecionadoId] = useState("");
  const [resumoTurma, setResumoTurma] = useState<any>(null);
  const [resumoAluno, setResumoAluno] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const turmaAtualId = useMemo(() => turmaSelecionada?.id || "", [turmaSelecionada]);

  // Carrega as turmas ao montar o componente (padrão useTurmas)
  useEffect(() => {
    carregarTurmas().then((dados) => {
      if (dados && dados.length > 0) {
        setTurmaSelecionada(dados[0]);
      }
    });
  }, [carregarTurmas]);

  // Carrega a lista de alunos utilizando o cliente de API customizado
  useEffect(() => {
    const carregarAlunos = async () => {
      if (!turmaAtualId) {
        setAlunos([]);
        setAlunoSelecionadoId("");
        return;
      }

      try {
        const dados = await api.get<AlunoResSummary[]>(`/api/alunos/turma/${turmaAtualId}`);
        setAlunos(dados || []);
        setAlunoSelecionadoId((atual) => atual || dados[0]?.id || "");
      } catch (error) {
        console.error("Erro ao carregar alunos", error);
        setAlunos([]);
        setAlunoSelecionadoId("");
      }
    };

    carregarAlunos();
  }, [turmaAtualId]);

  // Carrega os relatórios via Promise.all utilizando a instância do Axios/api
  useEffect(() => {
    const carregarRelatorios = async () => {
      if (!turmaAtualId) return;

      setCarregando(true);
      setErro("");

      try {
        const [dadosTurma, dadosAluno] = await Promise.all([
          api.get<any>(`/api/relatorios/turma/${turmaAtualId}`),
          alunoSelecionadoId
            ? api.get<any>(`/api/relatorios/aluno/${alunoSelecionadoId}`)
            : Promise.resolve(null),
        ]);

        if (!dadosTurma) {
          setErro("Não foi possível carregar o relatório da turma.");
        } else {
          setResumoTurma(dadosTurma);
        }

        if (alunoSelecionadoId && !dadosAluno) {
          setErro((mensagemAtual) => mensagemAtual || "Não foi possível carregar o relatório do aluno.");
        } else if (dadosAluno) {
          setResumoAluno(dadosAluno);
        }
      } catch (error: any) {
        console.error("Erro ao carregar relatórios", error);
        setErro(error.message || "Falha de ligação ao servidor.");
      } finally {
        setCarregando(false);
      }
    };

    carregarRelatorios();
  }, [turmaAtualId, alunoSelecionadoId]);

  const faltosos = useMemo<AlunoFaltoso[]>(() => resumoTurma?.alunosFaltosos ?? [], [resumoTurma]);
  const historicoTurma = useMemo(() => resumoTurma?.historicoTurma ?? [], [resumoTurma]);
  const historicoAluno = useMemo(() => resumoAluno?.historico ?? [], [resumoAluno]);
  const taxaTurma = resumoTurma?.taxaAssiduidade ?? "0%";
  const taxaAluno = resumoAluno?.taxaAssiduidade ?? "0%";
  const presencaTurma = Number.parseFloat(String(taxaTurma).replace("%", "")) || 0;
  const presencaAluno = Number.parseFloat(String(taxaAluno).replace("%", "")) || 0;

  const handleExportar = async () => {
    if (!resumoTurma) {
      setErro("Carregue uma turma antes de exportar o relatório.");
      return;
    }

    const [{ default: jsPDF }, autoTableModule] = await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
    ]);

    const autoTable = (autoTableModule as any).default ?? (autoTableModule as any).autoTable;
    const doc = new jsPDF();
    const turma = resumoTurma?.turma;
    const aluno = resumoAluno?.aluno;
    const dataGeracao = new Date().toLocaleString("pt-BR");

    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, 210, 24, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("Relatório Gerencial de Frequência", 14, 14);
    doc.setFontSize(10);
    doc.text(`Gerado em ${dataGeracao}`, 14, 20);

    doc.setTextColor(20, 20, 20);
    doc.setFontSize(13);
    doc.text(`Turma: ${turma?.codigo ?? "--"} - ${turma?.nome ?? "--"}`, 14, 34);

    autoTable(doc, {
      startY: 40,
      head: [["Indicador", "Valor"]],
      body: [
        ["Total de alunos", String(turma?.totalAlunos ?? 0)],
        ["Total de aulas", String(resumoTurma?.totalAulas ?? 0)],
        ["Presenças", String(resumoTurma?.totalPresencas ?? 0)],
        ["Faltas", String(resumoTurma?.totalFaltas ?? 0)],
        ["Taxa de assiduidade", resumoTurma?.taxaAssiduidade ?? "0%"],
        ["Média de presença do dashboard", `${resumoTurma?.taxaAssiduidade ?? "0%"}`],
      ],
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [30, 41, 59] },
      alternateRowStyles: { fillColor: [248, 248, 248] },
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 8,
      head: [["Aluno", "Matrícula", "Presenças", "Faltas", "Taxa"]],
      body: (resumoTurma?.alunosFaltosos ?? []).map((item: AlunoFaltoso) => [
        item.nome,
        item.matricula ?? "--",
        String(item.presencas),
        String(item.faltas),
        `${item.taxaPresenca}%`,
      ]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [239, 68, 68] },
      alternateRowStyles: { fillColor: [254, 242, 242] },
    });

    if (aluno) {
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 8,
        head: [["Aluno", "Turma", "Presenças", "Faltas", "Taxa"]],
        body: [[
          aluno.nome,
          aluno.turma?.codigo ?? "--",
          String(resumoAluno?.totalPresencas ?? 0),
          String(resumoAluno?.totalFaltas ?? 0),
          resumoAluno?.taxaAssiduidade ?? "0%",
        ]],
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [16, 185, 129] },
      });
    }

    const historicoRows = (resumoTurma?.historicoTurma ?? []).map((aula: any) => [
      new Date(aula.data).toLocaleDateString("pt-BR"),
      `${aula.hora_inicio} - ${aula.hora_fim}`,
      String(aula.presentes),
      String(aula.faltas),
      aula.faltosos?.length ? aula.faltosos.join(", ") : "Sem faltas",
    ]);

    if (historicoRows.length > 0) {
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 8,
        head: [["Data", "Horário", "Presentes", "Faltas", "Faltosos"]],
        body: historicoRows,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [71, 85, 105] },
      });
    }

    doc.save(`relatorio-${turma?.codigo ?? "turma"}.pdf`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-300 pb-10">
      <Header />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <main className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
                Relatórios Gerenciais
              </h1>
              <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mt-1">
                Acompanhe indicadores de frequência e gere PDFs detalhados.
              </p>
            </div>
            <button
              onClick={handleExportar}
              disabled={carregando}
              className="h-10 px-5 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white rounded-lg font-sans font-medium text-sm transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              {carregando ? "Gerando..." : "Exportar PDF"}
            </button>
          </div>

          {erro && (
            <div className="w-full p-4 rounded-lg text-sm font-medium border bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
              {erro}
            </div>
          )}

          <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch">
            
            {/* ================= COLUNA DA ESQUERDA: VISÃO DA TURMA ================= */}
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 flex flex-col gap-6">
              
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Visão Geral da Turma
                </label>
                <div className="relative">
                  <select
                    value={turmaSelecionada?.id || ""}
                    onChange={(e) => {
                      const t = turmas.find((item) => item.id === e.target.value);
                      setTurmaSelecionada(t || null);
                    }}
                    className="w-full h-11 px-4 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm appearance-none"
                  >
                    <option value="" disabled hidden>Selecione uma Turma...</option>
                    {turmas.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.codigo} - {t.nome}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Gráfico de Barras - Turma */}
              <div className="w-full bg-gray-50 dark:bg-slate-900/50 rounded-xl p-5 flex flex-col border border-gray-200 dark:border-slate-700">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">
                  Presença Mensal Média
                </span>
                <div className="w-full h-[140px] flex items-end justify-around px-2 relative mt-4">
                  <div className="absolute inset-x-0 bottom-[25%] border-t border-dashed border-gray-200 dark:border-slate-700 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-[50%] border-t border-dashed border-gray-200 dark:border-slate-700 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-[75%] border-t border-dashed border-gray-200 dark:border-slate-700 pointer-events-none" />
                  
                  {(historicoTurma.length > 0 ? historicoTurma.slice(0, 6).reverse() : []).map((aula: any) => (
                    <div key={aula.id} className="flex flex-col items-center gap-2 z-10 w-[14%] group cursor-pointer relative">
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 bg-white dark:bg-slate-800 px-2 py-0.5 rounded shadow-sm border border-gray-100 dark:border-slate-700">
                        {aula.presentes}/{aula.presentes + aula.faltas}
                      </span>
                      <div className="w-full max-w-[24px] h-[100px] bg-gray-200 dark:bg-slate-700 rounded-t-md flex items-end overflow-hidden">
                        <div
                          className="w-full bg-primary-500 dark:bg-primary-600 rounded-t-md transition-all duration-1000"
                          style={{ height: `${aula.presentes + aula.faltas > 0 ? Math.round((aula.presentes / (aula.presentes + aula.faltas)) * 100) : 0}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase mt-1">
                        {new Date(aula.data).toLocaleDateString("pt-BR", { month: "short" })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lista dos Mais Faltosos */}
              <div className="w-full flex-1 bg-red-50/50 dark:bg-red-900/10 rounded-xl p-5 flex flex-col border border-red-100 dark:border-red-900/30">
                <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-4 border-b border-red-200 dark:border-red-900/50 pb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Alunos com Risco de Retenção
                </span>
                
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[140px] custom-scrollbar pr-1">
                  {carregando ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400 py-2">Carregando dados...</div>
                  ) : faltosos.length === 0 ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400 py-2">Frequência da turma está regular.</div>
                  ) : (
                    faltosos.map((aluno) => (
                      <div key={aluno.id} className="flex justify-between items-center text-sm bg-white dark:bg-slate-800 p-3 rounded-lg border border-red-200 dark:border-red-800/50">
                        <span className="font-medium text-gray-800 dark:text-gray-200 truncate pr-4">{aluno.nome}</span>
                        <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2.5 py-1 rounded-md shrink-0">
                          {100 - aluno.taxaPresenca}% faltas
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* ================= COLUNA DA DIREITA: VISÃO DO ALUNO ================= */}
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 flex flex-col gap-6">
              
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Visão Individual
                </label>
                <div className="relative">
                  <select
                    value={alunoSelecionadoId}
                    onChange={(e) => setAlunoSelecionadoId(e.target.value)}
                    className="w-full h-11 px-4 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm appearance-none"
                  >
                    <option value="" disabled hidden>Selecione um Aluno...</option>
                    {alunos.map((aluno) => (
                      <option key={aluno.id} value={aluno.id}>
                        {aluno.nome} - {aluno.matricula}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Gráfico de Barras - Aluno */}
              <div className="w-full bg-gray-50 dark:bg-slate-900/50 rounded-xl p-5 flex flex-col border border-gray-200 dark:border-slate-700">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">
                  Histórico de Chamadas
                </span>
                <div className="w-full h-[140px] flex items-end justify-around px-2 relative mt-4">
                  <div className="absolute inset-x-0 bottom-[25%] border-t border-dashed border-gray-200 dark:border-slate-700 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-[50%] border-t border-dashed border-gray-200 dark:border-slate-700 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-[75%] border-t border-dashed border-gray-200 dark:border-slate-700 pointer-events-none" />
                  
                  {(historicoAluno.length > 0 ? historicoAluno.slice(0, 6).reverse() : []).map((item: any) => (
                    <div key={item.aulaId} className="flex flex-col items-center gap-2 z-10 w-[14%] group cursor-pointer relative">
                      <span className={`text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 bg-white dark:bg-slate-800 px-2 py-0.5 rounded shadow-sm border border-gray-100 dark:border-slate-700 ${item.status === "presente" ? "text-primary-600 dark:text-primary-400" : "text-red-500 dark:text-red-400"}`}>
                        {item.status === "presente" ? "Presença" : "Falta"}
                      </span>
                      <div className="w-full max-w-[24px] h-[100px] bg-gray-200 dark:bg-slate-700 rounded-t-md flex items-end overflow-hidden">
                        <div
                          className={`w-full rounded-t-md transition-all duration-1000 ${item.status === "presente" ? "bg-primary-500 dark:bg-primary-600" : "bg-red-500 dark:bg-red-600"}`}
                          style={{ height: `${item.status === "presente" ? 100 : 25}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase mt-1">
                        {new Date(item.data).toLocaleDateString("pt-BR", { month: "short" })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumo do Aluno (Donut Chart) */}
              <div className="w-full bg-primary-50/50 dark:bg-primary-900/10 rounded-xl p-6 flex flex-col sm:flex-row items-center border border-primary-100 dark:border-primary-900/30 gap-6">
                <div className="flex flex-col flex-1 w-full text-center sm:text-left">
                  <span className="text-lg font-bold text-gray-900 dark:text-white truncate mb-4">
                    {resumoAluno?.aluno?.nome ?? "Selecione um aluno"}
                  </span>
                  
                  <div className="flex flex-col gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between items-center">
                      <span>Total de Aulas:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{historicoAluno.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Média de Presença:</span>
                      <span className="font-semibold text-primary-600 dark:text-primary-400">{taxaAluno}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Turma:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{resumoAluno?.aluno?.turma?.codigo ?? "--"}</span>
                    </div>
                  </div>
                </div>

                {/* Donut Chart Moderno */}
                <div className="flex flex-col items-center justify-center shrink-0">
                  <div
                    className="w-24 h-24 rounded-full relative flex items-center justify-center drop-shadow-md"
                    style={{
                      background: `conic-gradient(var(--tw-gradient-stops))`,
                      backgroundImage: `conic-gradient(from 0deg, #10b981 0% ${presencaAluno}%, #ef4444 ${presencaAluno}% 100%)`
                    }}
                  >
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex flex-col items-center justify-center shadow-inner">
                      <span className="text-base font-bold text-gray-900 dark:text-white">{presencaAluno}%</span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-4 text-xs font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Pres
                    </span>
                    <span className="flex items-center gap-1.5 text-red-500 dark:text-red-400">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span> Falt
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}