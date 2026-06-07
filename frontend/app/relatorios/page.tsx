"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Days_One } from "next/font/google";

const daysOne = Days_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface AlunoFaltoso {
  id: number;
  nome: string;
  porcentagem: string;
}

export default function Relatorios() {
  const router = useRouter();

  const [turmaSelecionada, setTurmaSelecionada] = useState("");
  const [alunoSelecionado, setAlunoSelecionado] = useState("");

  const [faltosos] = useState<AlunoFaltoso[]>([
    { id: 1, nome: "ALUNO CICLANO", porcentagem: "50% DE FALTAS" },
    { id: 2, nome: "ALUNO DE BELTRANO", porcentagem: "70% DE FALTAS" },
    { id: 3, nome: "ALUNO CICLANO", porcentagem: "50% DE FALTAS" },
    { id: 4, nome: "ALUNO DE BELTRANO", porcentagem: "70% DE FALTAS" },
    { id: 5, nome: "ALUNO CICLANO", porcentagem: "50% DE FALTAS" },
    { id: 6, nome: "ALUNO DE BELTRANO", porcentagem: "70% DE FALTAS" },
    { id: 7, nome: "ALUNO CICLANO", porcentagem: "50% DE FALTAS" },
    { id: 8, nome: "ALUNO DE BELTRANO", porcentagem: "70% DE FALTAS" },
  ]);

  const dadosPizzaExemplo = {
    presencaPorcentagem: 75,
    faltasPorcentagem: 25,
    totalAulas: 40,
  };

  const handleExportar = () => {
    console.log("Iniciando download do relatório...");
    window.print();
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-degrade-zilla overflow-x-hidden pt-6 pb-10 select-none">
      {/* ================= HEADER / CABEÇALHO PRINCIPAL ================= */}
      <header className="w-full max-w-[1058px] h-[84px] mx-auto bg-black flex items-center justify-between px-10 shadow-lg">
        <h2 className="font-aclonica text-[26px] text-white drop-shadow-sm">
          Zilla University
        </h2>

        <div className="w-[743px] flex items-center justify-end">
          <nav className="flex items-center gap-10">
            <button
              onClick={() => router.push("/home")}
              className="font-crimson text-[23px] font-normal text-white underline uppercase tracking-wider hover:text-[#FF8D28] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => router.push("/turmas")}
              className="font-crimson text-[23px] font-normal text-white underline uppercase tracking-wider hover:text-[#FF8D28] transition-colors cursor-pointer"
            >
              Turma
            </button>
            <button
              onClick={() => router.push("/controle")}
              className="font-crimson text-[23px] font-normal text-white underline uppercase tracking-wider hover:text-[#FF8D28] transition-colors cursor-pointer"
            >
              Controle
            </button>
            <button
              onClick={() => router.push("/relatorios")}
              className="font-crimson text-[23px] font-normal text-[#FF8D28] underline uppercase tracking-wider transition-colors cursor-pointer"
            >
              Relatórios
            </button>
          </nav>
        </div>
      </header>

      {/* ================= AREA PRINCIPAL ================= */}
      <div className="w-full max-w-[1058px] mx-auto">
        <main className="w-full h-[514px] bg-white flex flex-col items-center pt-4 shadow-2xl relative">
          <h1
            className={`${daysOne.className} text-2xl text-black uppercase tracking-wider mb-2 text-center`}
          >
            RELATÓRIOS GERENCIAIS
          </h1>

          <div className="w-[830px] h-[385px] bg-[#D06B0E]/80 rounded-[15px] flex justify-between pt-4 px-6 shadow-inner relative gap-4">
            <div className="w-[385px] flex flex-col items-center">
              {/* Buscar Turma */}
              <div className="w-full h-[38px] bg-white rounded-[10px] flex items-center px-3 shadow-md mb-3 shrink-0">
                <select
                  value={turmaSelecionada}
                  onChange={(e) => setTurmaSelecionada(e.target.value)}
                  className="w-full h-full bg-transparent border-none outline-none font-crimson text-sm text-black/70 cursor-pointer appearance-none"
                >
                  <option value="" disabled hidden>
                    Buscar Turma...
                  </option>
                  <option value="turma-a">Turma A</option>
                  <option value="turma-b">Turma B</option>
                </select>
                <div className="pointer-events-none border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/60 w-0 h-0 ml-2" />
              </div>

              {/* Gráfico de Meses - Turma */}
              <div className="w-full h-[95px] bg-white rounded-[10px] shadow-md p-2 flex flex-col justify-between mb-3 shrink-0">
                <span className="text-[9px] font-bold text-gray-400 uppercase font-crimson">
                  Presença Mensal da Turma (%)
                </span>
                <div className="w-full h-[65px] flex items-end justify-between px-2 pt-2 relative">
                  <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-gray-200 pointer-events-none" />
                  {[65, 78, 72, 85, 90, 88].map((val, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1 z-10"
                    >
                      <div
                        className="w-3 bg-[#1E0144] rounded-t-[2px] transition-all duration-500"
                        style={{ height: `${val * 0.5}px` }}
                      />
                      <span className="text-[8px] font-semibold text-gray-500 font-mono">
                        {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"][idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lista dos Mais Faltosos */}
              <div className="w-full h-[155px] bg-white rounded-[10px] shadow-md p-2.5 flex flex-col overflow-y-auto">
                <span className="text-[10px] font-bold text-red-600 uppercase font-crimson mb-2 block tracking-wide">
                  ⚠️ Alunos Mais Faltosos
                </span>
                <div className="flex flex-col gap-1.5">
                  {faltosos.map((aluno) => (
                    <div
                      key={aluno.id}
                      className="flex justify-between items-center text-xs text-black font-crimson bg-gray-50 p-1 rounded-sm border border-gray-100"
                    >
                      <span className="font-semibold truncate max-w-[200px]">
                        {aluno.nome}
                      </span>
                      <span className="text-[10px] text-red-600 font-bold font-mono">
                        {aluno.porcentagem}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/*COLUNA DA DIREITA: VISÃO DO ALUNO */}
            <div className="w-[385px] flex flex-col items-center">
              {/* Buscar Aluno */}
              <div className="w-full h-[38px] bg-white rounded-[10px] flex items-center px-3 shadow-md mb-3 shrink-0">
                <select
                  value={alunoSelecionado}
                  onChange={(e) => setAlunoSelecionado(e.target.value)}
                  className="w-full h-full bg-transparent border-none outline-none font-crimson text-sm text-black/70 cursor-pointer appearance-none"
                >
                  <option value="" disabled hidden>
                    Buscar Aluno...
                  </option>
                  <option value="aluno-1">Aluno Ciclano</option>
                  <option value="aluno-2">Aluno Beltrano</option>
                </select>
                <div className="pointer-events-none border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/60 w-0 h-0 ml-2" />
              </div>

              {/* Gráfico de Meses - Aluno */}
              <div className="w-full h-[95px] bg-white rounded-[10px] shadow-md p-2 flex flex-col justify-between mb-3 shrink-0">
                <span className="text-[9px] font-bold text-gray-400 uppercase font-crimson">
                  Presença Mensal do Aluno (%)
                </span>
                <div className="w-full h-[65px] flex items-end justify-between px-2 pt-2 relative">
                  <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-gray-200 pointer-events-none" />
                  {[70, 85, 60, 92, 78, 84].map((val, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1 z-10"
                    >
                      <div
                        className="w-3 bg-[#1E0144] rounded-t-[2px] transition-all duration-500"
                        style={{ height: `${val * 0.5}px` }}
                      />
                      <span className="text-[8px] font-semibold text-gray-500 font-mono">
                        {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"][idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Histórico Individual (Faltas vs Presença) */}
              <div className="w-full h-[94px] bg-white rounded-[10px] shadow-md p-2.5 flex font-crimson text-black mb-3 grow justify-between gap-2">
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">
                      Histórico Individual do Aluno
                    </span>
                    <span className="text-xs font-bold text-gray-800 uppercase block tracking-wide">
                      {alunoSelecionado
                        ? alunoSelecionado === "aluno-1"
                          ? "Aluno Ciclano"
                          : "Aluno Beltrano"
                        : "Zilla Netesilva"}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-1 flex flex-col text-[11px] font-bold text-[#1E0144] gap-0.5">
                    <span>Total de Aulas: {dadosPizzaExemplo.totalAulas}</span>
                    <span className="flex items-center gap-1">
                      Frequência Acumulada:
                      <span className="text-[#1E0144]">
                        {dadosPizzaExemplo.presencaPorcentagem}%
                      </span>
                    </span>
                  </div>
                </div>

                {/* GRÁFICO DE PIZZA VIA CSS */}
                <div className="flex flex-col items-center justify-center shrink-0 w-[80px]">
                  <div
                    className="w-[50px] h-[50px] rounded-full shadow-sm relative flex items-center justify-center"
                    style={{
                      background: `conic-gradient(#1E0144 0% ${dadosPizzaExemplo.presencaPorcentagem}%, #900B09 ${dadosPizzaExemplo.presencaPorcentagem}% 100%)`,
                    }}
                  >
                    <div className="w-[24px] h-[24px] bg-white rounded-full flex items-center justify-center text-[8px] font-bold font-sans text-gray-700">
                      %
                    </div>
                  </div>

                  {/* Legenda do Gráfico de Pizza */}
                  <div className="flex gap-2 mt-1 text-[8px] font-sans font-bold uppercase tracking-tight">
                    <span className="text-[#1E0144]">● Pres</span>
                    <span className="text-[#900B09]">● Falt</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleExportar}
                className="w-full h-[40px] bg-[#1E0144] rounded-[10px] font-crimson font-bold text-sm text-white uppercase tracking-wider hover:bg-[#12002b] active:scale-98 transition-all shadow-md cursor-pointer flex items-center justify-center shrink-0 mb-2"
              >
                Exportar Relatório PDF / Imprimir
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
