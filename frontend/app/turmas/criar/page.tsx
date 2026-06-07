"use client";

import { useRouter } from "next/navigation";
import { Days_One } from "next/font/google";

const daysOne = Days_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function CriarEditarTurma() {
  const router = useRouter();

  const handleCriarTurma = () =>
    console.log("Ação de Criar/Editar dados da Turma");
  const handleRemoverTurma = () =>
    console.log("Ação de Limpar/Remover dados da Turma");
  const handleAdicionarAluno = () => console.log("Ação de Adicionar Aluno");
  const handleRemoverAluno = () => console.log("Ação de Remover Aluno");
  const handleSalvarTudo = () => {
    console.log("Salvando alterações no banco de dados...");
    router.push("/turmas");
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
              className="font-crimson text-[23px] font-normal text-[#FF8D28] underline uppercase tracking-wider transition-colors cursor-pointer"
            >
              Turma
            </button>
          </nav>
        </div>
      </header>

      <div className="w-full max-w-[1058px] mx-auto">
        <main className="w-full h-[616px] bg-white flex flex-col pt-5 px-8 shadow-2xl relative">
          <div className="w-full flex justify-between items-start mb-3">
            <div className="w-[388px] h-[495px] bg-[#B53C00] rounded-[15px] flex flex-col items-center pt-4 px-5 shadow-lg">
              <h2
                className={`${daysOne.className} text-lg text-white uppercase text-center tracking-wide mb-4`}
              >
                CRIAR / EDITAR TURMAS
              </h2>

              <div className="flex flex-col gap-3 w-[299px]">
                <div className="w-[299px] h-[60px] bg-white rounded-[15px] flex flex-col justify-center px-4 shadow-md">
                  <label className="font-crimson text-[11px] font-bold text-gray-400 uppercase leading-none mb-0.5">
                    Nome da Turma
                  </label>
                  <input
                    type="text"
                    placeholder="Digite o nome..."
                    className="bg-transparent border-none outline-none font-crimson text-lg text-black placeholder-gray-300"
                  />
                </div>

                <div className="w-[299px] h-[60px] bg-white rounded-[15px] flex flex-col justify-center px-4 shadow-md">
                  <label className="font-crimson text-[11px] font-bold text-gray-400 uppercase leading-none mb-0.5">
                    Código
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: ES-2026"
                    className="bg-transparent border-none outline-none font-crimson text-lg text-black placeholder-gray-300 font-mono"
                  />
                </div>

                <div className="w-[299px] h-[60px] bg-white rounded-[15px] flex flex-col justify-center px-4 shadow-md">
                  <label className="font-crimson text-[11px] font-bold text-gray-400 uppercase leading-none mb-0.5">
                    Horários
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 19:00 - 22:30"
                    className="bg-transparent border-none outline-none font-crimson text-lg text-black placeholder-gray-300"
                  />
                </div>
              </div>

              <div className="w-[299px] flex justify-between mt-6">
                <button
                  onClick={handleCriarTurma}
                  className="w-[135px] h-[33px] bg-[#14AE5C] rounded-[15px] font-crimson font-bold text-base text-white uppercase hover:bg-[#0f8c4a] transition-colors shadow cursor-pointer"
                >
                  Criar
                </button>
                <button
                  onClick={handleRemoverTurma}
                  className="w-[135px] h-[33px] bg-[#900B09] rounded-[15px] font-crimson font-bold text-base text-white uppercase hover:bg-[#700605] transition-colors shadow cursor-pointer"
                >
                  Remover
                </button>
              </div>
            </div>

            <div className="w-[388px] h-[495px] bg-[#B53C00] rounded-[15px] flex flex-col items-center pt-4 px-5 shadow-lg">
              <h2
                className={`${daysOne.className} text-lg text-white uppercase text-center tracking-wide mb-4`}
              >
                GERENCIAR ALUNO
              </h2>

              <div className="flex flex-col gap-3 w-[299px]">
                <div className="w-[299px] h-[60px] bg-white rounded-[15px] flex flex-col justify-center px-4 shadow-md">
                  <label className="font-crimson text-[11px] font-bold text-gray-400 uppercase leading-none mb-0.5">
                    Nome do Aluno
                  </label>
                  <input
                    type="text"
                    placeholder="Nome completo..."
                    className="bg-transparent border-none outline-none font-crimson text-lg text-black placeholder-gray-300"
                  />
                </div>

                <div className="w-[299px] h-[60px] bg-white rounded-[15px] flex flex-col justify-center px-4 shadow-md">
                  <label className="font-crimson text-[11px] font-bold text-gray-400 uppercase leading-none mb-0.5">
                    Matrícula
                  </label>
                  <input
                    type="text"
                    placeholder="Número de matrícula..."
                    className="bg-transparent border-none outline-none font-crimson text-lg text-black placeholder-gray-300 font-mono"
                  />
                </div>

                <div className="w-[299px] h-[60px] bg-white rounded-[15px] flex flex-col justify-center px-4 shadow-md">
                  <label className="font-crimson text-[11px] font-bold text-gray-400 uppercase leading-none mb-0.5">
                    Turma Vinculada
                  </label>
                  <input
                    type="text"
                    placeholder="Vincular à turma..."
                    className="bg-transparent border-none outline-none font-crimson text-lg text-black placeholder-gray-300"
                  />
                </div>
              </div>

              <div className="w-[299px] flex justify-between mt-6">
                <button
                  onClick={handleAdicionarAluno}
                  className="w-[135px] h-[33px] bg-[#14AE5C] rounded-[15px] font-crimson font-bold text-base text-white uppercase hover:bg-[#0f8c4a] transition-colors shadow cursor-pointer"
                >
                  Adicionar
                </button>
                <button
                  onClick={handleRemoverAluno}
                  className="w-[135px] h-[33px] bg-[#900B09] rounded-[15px] font-crimson font-bold text-base text-white uppercase hover:bg-[#700605] transition-colors shadow cursor-pointer"
                >
                  Remover
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-5 right-8">
            <button
              onClick={handleSalvarTudo}
              className="w-[100px] h-[45px] bg-[#AD1888] font-crimson font-bold text-lg text-white uppercase tracking-wider hover:bg-[#89106b] active:scale-95 transition-all shadow-xl cursor-pointer flex items-center justify-center rounded-[15px]"
            >
              Salvar
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
