"use client";

import { useRouter } from "next/navigation";
import { Days_One } from "next/font/google";

const daysOne = Days_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Turmas() {
  const router = useRouter();

  const handleCriar = () => router.push("/turmas/criar");
  const handleEditar = () => router.push("/turmas/criar");
  const handleRemover = () => router.push("/turmas/criar");

  const alunosDoBanco: string[] = [];

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
              className="font-crimson text-[23px] font-normal text-[#FF8D28] underline uppercase tracking-wider transition-colors cursor-pointer"
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
            GERENCIAR TURMAS
          </h1>

          <div className="w-[798px] h-[365px] bg-[#4F0474] rounded-[15px] flex flex-col items-center pt-4 px-6 shadow-inner">
            <div className="w-[737px] h-[46px] bg-white rounded-[15px] flex items-center px-4 shadow-md mb-4 shrink-0">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full h-full bg-transparent border-none outline-none font-crimson text-lg text-black placeholder-black/50"
              />
            </div>

            <div className="w-[737px] flex justify-center gap-8 mb-4 shrink-0">
              <button
                onClick={handleCriar}
                className="w-[161px] h-[46px] bg-[#14AE5C] rounded-[15px] font-crimson font-bold text-lg text-white uppercase tracking-wide hover:bg-[#0f8c4a] active:scale-95 transition-all shadow-md cursor-pointer"
              >
                Criar
              </button>

              <button
                onClick={handleEditar}
                className="w-[161px] h-[46px] bg-[#FF8D28] rounded-[15px] font-crimson font-bold text-lg text-white uppercase tracking-wide hover:bg-[#e0771f] active:scale-95 transition-all shadow-md cursor-pointer"
              >
                Editar
              </button>

              <button
                onClick={handleRemover}
                className="w-[161px] h-[46px] bg-[#900B09] rounded-[15px] font-crimson font-bold text-lg text-white uppercase tracking-wide hover:bg-[#700605] active:scale-95 transition-all shadow-md cursor-pointer"
              >
                Remover
              </button>
            </div>

            <div className="w-[737px] h-[182px] flex gap-3">
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
                  <span className="text-sm font-bold text-[#4F0474]">--</span>
                </div>
              </div>

              <div className="w-[572px] h-[131px] bg-white overflow-y-auto shadow-md p-2.5 flex flex-col gap-2 justify-center items-center rounded-sm">
                {alunosDoBanco.length > 0 ? (
                  alunosDoBanco.map((aluno, index) => (
                    <div
                      key={index}
                      className="w-full flex items-center justify-between font-crimson text-base text-black py-1 px-2.5 bg-gray-50 border border-gray-100"
                    >
                      <span>
                        {String(index + 1).padStart(2, "0")}. {aluno}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="font-crimson italic text-gray-400 text-base">
                    Nenhum aluno carregado para esta turma.
                  </span>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
