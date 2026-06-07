"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    console.log("Autenticando na API NestJS com:", { email, senha });

    router.push("/home");
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-degrade-zilla select-none">
      <div
        className="absolute left-[-150px] bottom-[-150px] w-[797px] h-[619px] pointer-events-none hidden md:block z-0"
        style={{ transform: "rotate(-15deg)" }}
      >
        <img
          src="/logofundo.png"
          alt="Logo de Fundo Esquerdo"
          className="w-full h-full object-contain opacity-20"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/logofundo.PNG";
          }}
        />
      </div>

      <div
        className="absolute right-[-150px] top-[-150px] w-[797px] h-[619px] pointer-events-none hidden md:block z-0"
        style={{ transform: "rotate(15deg)" }}
      >
        <img
          src="/logofundo.png"
          alt="Logo de Fundo Direito"
          className="w-full h-full object-contain opacity-15"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/logofundo.PNG";
          }}
        />
      </div>

      {/* Retângulo Principal */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-[521px] min-h-[574px] bg-[#D06B0E] rounded-[18px] shadow-2xl flex flex-col items-center justify-between p-8 transition-all"
      >
        <h1 className="font-crimson text-white text-4xl font-bold tracking-wide mt-2">
          LOGIN
        </h1>

        <div className="w-full flex flex-col items-center gap-4 my-auto">
          <div className="w-full max-w-[386px] h-[46px]">
            <input
              type="email"
              placeholder="Usuário (e-mail)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-full px-5 bg-white rounded-[18px] font-crimson text-black placeholder-black/60 text-base outline-none focus:ring-4 focus:ring-[#74095A]/50 transition-all shadow-inner"
            />
          </div>

          <div className="w-full max-w-[386px] h-[46px]">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full h-full px-5 bg-white rounded-[18px] font-crimson text-black placeholder-black/60 text-base outline-none focus:ring-4 focus:ring-[#74095A]/50 transition-all shadow-inner"
            />
          </div>

          {erro && (
            <span className="text-white text-xs font-crimson bg-[#74095A] px-4 py-1 rounded-md animate-pulse">
              {erro}
            </span>
          )}

          <a
            href="#esqueci"
            className="font-crimson italic underline text-white text-sm hover:text-[#74095A] transition-colors mt-1"
          >
            Esqueci Minha Senha
          </a>
        </div>

        <button
          type="submit"
          className="w-[140px] h-[54px] bg-[#74095A] rounded-[18px] text-white font-crimson font-bold text-base tracking-wider hover:bg-[#52043f] active:scale-95 focus:ring-4 focus:ring-white/30 transition-all shadow-lg flex items-center justify-center mb-2 cursor-pointer"
        >
          ENTRAR
        </button>
      </form>

      <div className="mt-6 z-10">
        <h2 className="font-aclonica text-[38px] text-[#74095A] md:text-[#D06B0E] drop-shadow-md text-center">
          Zilla University
        </h2>
      </div>
    </main>
  );
}
