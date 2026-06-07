"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Days_One } from "next/font/google";

const daysOne = Days_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Historico() {
  const router = useRouter();

  const [porcentagemPresentes, setPorcentagemPresentes] = useState(80);
  const [porcentagemAusentes, setPorcentagemAusentes] = useState(40);
  const [dataHora, setDataHora] = useState("");

  const handleSalvar = () => {
    console.log("Histórico salvo/exportado");
    router.push("/controle");
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
              onClick={() => router.push("/controle")}
              className="font-crimson text-[23px] font-normal text-[#FF8D28] underline uppercase tracking-wider transition-colors cursor-pointer"
            >
              Controle
            </button>
          </nav>
        </div>
      </header>

      <div className="w-full max-w-[1058px] mx-auto">
        <main className="w-full h-[514px] bg-white flex flex-col items-center pt-5 shadow-2xl relative">
          <h1
            className={`${daysOne.className} text-2xl text-black uppercase tracking-wider mb-3 text-center`}
          >
            HISTÓRICO
          </h1>

          <div className="w-[798px] h-[365px] bg-[#1E0144]/73 rounded-[15px] flex flex-col items-center pt-4 px-6 shadow-inner relative">
            <div className="w-[737px] h-[46px] bg-white rounded-[15px] flex items-center px-4 shadow-md mb-6 shrink-0">
              <label className="font-crimson text-xs font-bold text-gray-400 uppercase mr-4">
                Selecionar Data/Hora:
              </label>
              <input
                type="datetime-local"
                value={dataHora}
                onChange={(e) => setDataHora(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-crimson text-lg text-black/70 cursor-pointer"
              />
            </div>

            <div className="w-[737px] h-[182px] flex gap-3 mb-10">
              <div className="w-[152px] h-[155px] bg-white p-2.5 flex flex-col justify-between font-crimson text-black shadow-md shrink-0 rounded-sm">
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase leading-none">
                    Turma
                  </span>
                  <span className="text-sm font-bold text-gray-700">
                    Turma A
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase leading-none">
                    Código
                  </span>
                  <span className="text-xs font-mono text-gray-700">
                    ES-2026
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase leading-none">
                    Horário
                  </span>
                  <span className="text-xs font-semibold text-gray-700">
                    19:00
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase leading-none">
                    Alunos
                  </span>
                  <span className="text-sm font-bold text-[#1E0144]">35</span>
                </div>
              </div>

              <div className="w-[250px] h-[155px] bg-white shadow-md p-3 flex flex-col rounded-sm">
                <span className="block text-[10px] font-bold text-gray-400 uppercase mb-2">
                  Resumo da Aula
                </span>
                <textarea
                  placeholder="Escreva o que foi dado em aula..."
                  className="w-full h-full bg-gray-50 border border-gray-100 p-2 font-crimson text-sm text-black outline-none resize-none italic"
                />
              </div>

              <div className="w-[321px] h-[155px] bg-white shadow-md p-2 flex items-end justify-center gap-6 rounded-sm relative">
                <div className="w-[105px] h-[131px] flex flex-col justify-end relative bg-gray-50 rounded-sm overflow-hidden border border-gray-100">
                  <div
                    className="w-full bg-[#14AE5C] transition-all duration-500 flex flex-col items-center justify-center p-1"
                    style={{ height: `${porcentagemPresentes}%` }}
                  >
                    {porcentagemPresentes > 15 && (
                      <span className="font-sans text-[10px] text-white font-bold tracking-wider text-center uppercase leading-tight select-none">
                        Presentes
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-[105px] h-[106px] flex flex-col justify-end relative bg-gray-50 rounded-sm overflow-hidden border border-gray-100">
                  <div
                    className="w-full bg-[#900B09] transition-all duration-500 flex flex-col items-center justify-center p-1"
                    style={{ height: `${porcentagemAusentes}%` }}
                  >
                    {porcentagemAusentes > 15 && (
                      <span className="font-sans text-[10px] text-white font-bold tracking-wider text-center uppercase leading-tight select-none">
                        Ausentes
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-6">
              <button
                onClick={handleSalvar}
                className="w-[145px] h-[35px] bg-[#FF8D28] font-crimson font-bold text-base text-white uppercase tracking-wider hover:bg-[#e0771f] active:scale-95 transition-all shadow-xl cursor-pointer flex items-center justify-center rounded-[15px]"
              >
                Salvar Histórico
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
