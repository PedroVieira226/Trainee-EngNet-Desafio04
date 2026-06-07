"use client";

import { useRouter } from "next/navigation";
import { Days_One } from "next/font/google";

const daysOne = Days_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const router = useRouter();

  const handleSair = () => {
    router.push("/");
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
              className="font-crimson text-[23px] font-normal text-[#FF8D28] underline uppercase tracking-wider transition-colors cursor-pointer"
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
              className="font-crimson text-[23px] font-normal text-white underline uppercase tracking-wider hover:text-[#FF8D28] transition-colors cursor-pointer"
            >
              Relatórios
            </button>
          </nav>
        </div>
      </header>

      {/* ================= AREA PRINCIPAL COM CONTEÚDO ================= */}
      <div className="flex w-full max-w-[1058px] mx-auto items-start shadow-2xl backdrop-blur-sm">
        <aside className="w-[315px] h-[595px] bg-[#FF8D28] flex flex-col items-center pt-5 pb-8 px-5 shrink-0">
          <div className="w-full flex flex-col items-center">
            <div className="w-[172px] min-h-[172px] h-[172px] mb-5 pointer-events-none flex items-center justify-center overflow-visible">
              <img
                src="/logofundo.png"
                alt="Logo Início"
                className="w-full h-full object-contain filter brightness-0 invert"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/logofundo.PNG";
                }}
              />
            </div>

            <div className="w-[224px] h-[70px] bg-white rounded-[15px] flex items-center justify-center shadow-lg">
              <span className="font-crimson font-bold text-xl text-[#14AE5C]">
                Olá professor(a)
              </span>
            </div>

            <button
              onClick={handleSair}
              className="w-[224px] h-[70px] bg-white rounded-[15px] flex items-center justify-center shadow-lg hover:bg-red-50 active:scale-98 transition-all cursor-pointer group mt-3"
            >
              <span className="font-crimson font-bold text-xl text-[#900B09] group-hover:scale-105 transition-transform">
                SAIR
              </span>
            </button>
          </div>
        </aside>

        {/* MAIN / CONTEÚDO CENTRAL*/}
        <main className="w-[743px] h-[595px] bg-white/95 flex flex-col pt-8 px-10 gap-8 shrink-0 border-l border-white/20">
          {/* CARDS INDICADORES */}
          <div className="w-full flex justify-between items-center max-w-[651px]">
            <div className="flex flex-col items-center gap-2">
              <span className="font-crimson font-bold text-sm text-black tracking-wide uppercase">
                TOTAL DE ALUNO
              </span>
              <div className="w-[168px] h-[133px] bg-[#4F0474] rounded-[15px] shadow-xl flex items-center justify-center">
                <span className="font-crimson font-bold text-3xl text-white">
                  --
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="font-crimson font-bold text-sm text-black tracking-wide uppercase">
                AULAS CADRASTADAS
              </span>
              <div className="w-[168px] h-[133px] bg-[#4F0474] rounded-[15px] shadow-xl flex items-center justify-center">
                <span className="font-crimson font-bold text-3xl text-white">
                  --
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="font-crimson font-bold text-sm text-black tracking-wide uppercase">
                MEDIA DE FREQUENCIA
              </span>
              <div className="w-[168px] h-[133px] bg-[#4F0474] rounded-[15px] shadow-xl flex items-center justify-center">
                <span className="font-crimson font-bold text-3xl text-white">
                  --%
                </span>
              </div>
            </div>
          </div>

          {/* PAINEL DE ALERTAS */}
          <div className="w-[651px] h-[168px] bg-[#74095A]/76 rounded-[15px] shadow-2xl relative p-5 flex flex-col items-center justify-start">
            <h3
              className={`${daysOne.className} text-2xl text-white tracking-widest uppercase drop-shadow-md`}
            >
              !! ALERTAS !!
            </h3>

            <div className="w-full mt-3 text-center font-crimson italic text-white/90 text-base">
              Nenhum alerta crítico detectado no momento.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
