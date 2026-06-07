"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Days_One } from "next/font/google";

const daysOne = Days_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface AlunoChamada {
  id: number;
  nome: string;
  status: "presente" | "ausente" | null;
}

export default function Controle() {
  const router = useRouter();

  const [dataInput, setDataInput] = useState("");
  const [horarioInput, setHorarioInput] = useState("");
  const [turmaSelecionada, setTurmaSelecionada] = useState("");

  const [alunos, setAlunos] = useState<AlunoChamada[]>([
    { id: 1, nome: "CICLANO DE BELTRANO", status: null },
    { id: 2, nome: "CICLANO DE BELTRANO", status: null },
    { id: 3, nome: "CICLANO DE BELTRANO", status: null },
    { id: 4, nome: "CICLANO DE BELTRANO", status: null },
    { id: 5, nome: "CICLANO DE BELTRANO", status: null },
    { id: 6, nome: "CICLANO DE BELTRANO", status: null },
    { id: 7, nome: "CICLANO DE BELTRANO", status: null },
  ]);

  const handleStatusChange = (
    id: number,
    novoStatus: "presente" | "ausente",
  ) => {
    setAlunos((prev) =>
      prev.map((aluno) =>
        aluno.id === id ? { ...aluno, status: novoStatus } : aluno,
      ),
    );
  };

  const handleHistorico = () => {
    router.push("/controle/historico");
  };

  const handleSalvarChamada = () => {
    console.log("Salvando chamada...", {
      turma: turmaSelecionada,
      data: dataInput,
      horario: horarioInput,
      lista: alunos,
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-degrade-zilla overflow-x-hidden pt-6 pb-10 select-none">
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
              className="font-crimson text-[23px] font-normal text-[#FF8D28] underline uppercase tracking-wider transition-colors cursor-pointer"
            >
              Controle
            </button>
            <button
              onClick={() => router.push("/relatorios")}
              className="font-crimson text-[23px] font-normal text-white underline uppercase tracking-wider hover:text-[#FF8D28] transition-colors cursor-pointer"
            >
              Relatórios
            </button>
          </nav>
        </div>
      </header>

      <div className="w-full max-w-[1058px] mx-auto">
        <main className="w-full h-[514px] bg-white flex flex-col items-center pt-5 shadow-2xl relative">
          <h1
            className={`${daysOne.className} text-2xl text-black uppercase tracking-wider mb-3 text-center`}
          >
            CONTROLE DE FREQUÊNCIA
          </h1>

          <div className="w-[798px] h-[365px] bg-[#1E0144]/73 rounded-[15px] flex flex-col items-center pt-4 px-6 shadow-inner relative">
            <div className="w-[737px] h-[46px] bg-white rounded-[15px] flex items-center px-4 shadow-md mb-4 shrink-0">
              <select
                value={turmaSelecionada}
                onChange={(e) => setTurmaSelecionada(e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none font-crimson text-lg text-black/70 cursor-pointer appearance-none"
              >
                <option value="" disabled hidden>
                  Selecionar Turma...
                </option>
                <option value="turma-a">Turma A</option>
                <option value="turma-b">Turma B</option>
                <option value="turma-c">Turma C</option>
              </select>
              <div className="pointer-events-none ml-auto border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black/60 w-0 h-0" />
            </div>

            <div className="w-[737px] flex justify-center gap-8 mb-4 shrink-0">
              <div className="w-[161px] h-[46px] bg-white rounded-[15px] flex flex-col justify-center px-3 shadow-md">
                <label className="font-crimson text-[9px] font-bold text-gray-400 uppercase leading-none mb-0.5">
                  Data
                </label>
                <input
                  type="text"
                  placeholder="00/00/0000"
                  value={dataInput}
                  onChange={(e) => setDataInput(e.target.value)}
                  className="bg-transparent border-none outline-none font-crimson text-sm text-black placeholder-gray-300"
                />
              </div>

              <div className="w-[161px] h-[46px] bg-white rounded-[15px] flex flex-col justify-center px-3 shadow-md">
                <label className="font-crimson text-[9px] font-bold text-gray-400 uppercase leading-none mb-0.5">
                  Horário
                </label>
                <input
                  type="text"
                  placeholder="Ex: 19:00"
                  value={horarioInput}
                  onChange={(e) => setHorarioInput(e.target.value)}
                  className="bg-transparent border-none outline-none font-crimson text-sm text-black placeholder-gray-300"
                />
              </div>

              <button
                onClick={handleHistorico}
                className="w-[161px] h-[46px] bg-white rounded-[15px] font-crimson font-bold text-base text-black uppercase tracking-wide hover:bg-gray-50 active:scale-95 transition-all shadow-md cursor-pointer flex items-center justify-center"
              >
                Histórico
              </button>
            </div>

            <div className="w-[737px] h-[182px] flex gap-3 mb-10">
              <div className="w-[152px] h-[131px] bg-white p-2.5 flex flex-col justify-between font-crimson text-black shadow-md shrink-0 rounded-sm">
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase leading-none">
                    Turma
                  </span>
                  <span className="text-sm font-bold text-gray-700">--</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase leading-none">
                    Código
                  </span>
                  <span className="text-xs font-mono text-gray-700">--</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase leading-none">
                    Horário
                  </span>
                  <span className="text-xs font-semibold text-gray-700">
                    --
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase leading-none">
                    Alunos (Qtd)
                  </span>
                  <span className="text-sm font-bold text-[#1E0144]">--</span>
                </div>
              </div>

              <div className="w-[572px] h-[131px] bg-white overflow-y-auto shadow-md p-2.5 flex flex-col gap-2 rounded-sm">
                {alunos.map((aluno, index) => {
                  const isPresente = aluno.status === "presente";
                  const isAusente = aluno.status === "ausente";

                  return (
                    <div
                      key={aluno.id}
                      className="w-full flex items-center justify-between font-crimson text-base text-black py-1 px-2.5 bg-gray-50 border border-gray-100 rounded-sm shrink-0"
                    >
                      <span className="font-semibold text-gray-800 uppercase">
                        {String(index + 1).padStart(2, "0")}. {aluno.nome}
                      </span>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleStatusChange(aluno.id, "presente")
                          }
                          style={{ width: "73px", height: "8px" }}
                          className={`bg-[#14AE5C] rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center font-sans text-[7px] text-white font-bold leading-none select-none ${
                            isAusente ? "opacity-34" : "opacity-100"
                          } ${isPresente ? "ring-2 ring-offset-1 ring-[#14AE5C]" : ""}`}
                        >
                          Presente
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(aluno.id, "ausente")
                          }
                          style={{ width: "73px", height: "8px" }}
                          className={`bg-[#900B09] rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center font-sans text-[7px] text-white font-bold leading-none select-none ${
                            isPresente ? "opacity-34" : "opacity-100"
                          } ${isAusente ? "ring-2 ring-offset-1 ring-[#900B09]" : ""}`}
                        >
                          Ausente
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute bottom-4 right-6">
              <button
                onClick={handleSalvarChamada}
                className="w-[145px] h-[35px] bg-[#FF8D28] font-crimson font-bold text-base text-white uppercase tracking-wider hover:bg-[#e0771f] active:scale-95 transition-all shadow-xl cursor-pointer flex items-center justify-center rounded-[15px]"
              >
                Salvar Chamada
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
