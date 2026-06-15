"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { cadastroSchema, CadastroFormData } from "../../validations/authSchema";

export default function Cadastro() {
  const router = useRouter();

  const [carregando, setCarregando] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
  });

  const handleCadastro = async (data: CadastroFormData) => {
    setCarregando(true);

    try {
          const dadosErro = await api.post("usuarios", {
            nome: data.nome,
            email: data.email,
            senha: data.senha,
            perfil: "professor",
          });

          toast.success("Conta criada com sucesso!");
          setTimeout(() => router.push("/"), 2000);

        } catch (error: any) {
          const mensagemErro = error.message || "Erro ao criar conta.";
          toast.error(mensagemErro);
        } finally {
          setCarregando(false);
        }
    } catch (error) {
      toast.error("Falha ao contactar o servidor. Verifique o back-end.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">

      <div className="w-full max-w-md mb-8 text-center">
        <h2 className="font-serif text-4xl text-primary-900 dark:text-primary-100 font-bold drop-shadow-sm">
          Zilla University
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400 font-sans">
          Portal Acadêmico
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleCadastro)}
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 flex flex-col gap-6 transition-all"
      >
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
            Criar Conta
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Preencha seus dados institucionais
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Seu nome"
              {...register("nome")}
              className="w-full h-11 px-4 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg font-sans text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
              disabled={carregando}
            />
            {errors.nome && <span className="text-xs font-medium text-red-500 mt-1">{errors.nome.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              E-mail Institucional
            </label>
            <input
              type="email"
              placeholder="exemplo@zilla.edu"
              {...register("email")}
              className="w-full h-11 px-4 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg font-sans text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
              disabled={carregando}
            />
            {errors.email && <span className="text-xs font-medium text-red-500 mt-1">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              {...register("senha")}
              className="w-full h-11 px-4 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg font-sans text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
              disabled={carregando}
            />
            {errors.senha && <span className="text-xs font-medium text-red-500 mt-1">{errors.senha.message}</span>}
          </div>
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="w-full h-12 mt-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white rounded-lg font-sans font-medium text-base transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
        >
          {carregando ? "A salvar..." : "Cadastrar"}
        </button>

        <div className="flex flex-col items-center mt-2 pt-4 border-t border-gray-100 dark:border-slate-700">
          <Link href="/" className="font-sans text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            Já possui conta? <span className="text-primary-600 dark:text-primary-400 hover:underline">Faça Login</span>
          </Link>
        </div>
      </form>
    </main>
  );
}
