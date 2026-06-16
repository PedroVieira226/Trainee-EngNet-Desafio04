"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import { api } from "../../services/apiClient"; // Importação corrigida

interface Turma {
  id: string;
  nome: string;
  codigo: string;
  horario: string;
  curso?: string;
  capacidade?: number;
  qtdAlunos?: number;
  raw?: TurmaApiRaw;
}

interface TurmaApiRaw {
  id?: string;
  nome?: string;
  codigo?: string;
  horario?: string;
  curso?: string;
  capacidade?: number;
  qtdAlunos?: number | string;
  turma_id?: string;
  turma_nome?: string;
  turma_codigo?: string;
  turma_horario?: string;
  turma_curso?: string;
  turma_capacidade?: number;
  count?: number | string;
}

interface AlunoDaTurma {
  id: string;
  nome: string;
}

export default function Turmas() {
  const router = useRouter();

  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);
  const [alunosDoBanco, setAlunosDoBanco] = useState<AlunoDaTurma[]>([]);
  const [mensagem, setMensagem] = useState<{ texto: string; erro: boolean }>({ texto: "", erro: false });

  const normalizarTurma = (raw: TurmaApiRaw): Turma => ({
    id: raw.id ?? raw.turma_id ?? "",
    nome: raw.nome ?? raw.turma_nome ?? "",
    codigo: raw.codigo ?? raw.turma_codigo ?? "",
    horario: raw.horario ?? raw.turma_horario ?? "",
    curso: raw.curso ?? raw.turma_curso,
    capacidade: raw.capacidade ?? raw.turma_capacidade,
    qtdAlunos: Number(raw.qtdAlunos ?? raw.count) || 0,
    raw,
  });

  const buscarAlunosDaTurma = async (turmaId: string) => {
    try {
      const dados = await api.get<AlunoDaTurma[]>(`/alunos/turma/${turmaId}`);
      setAlunosDoBanco(dados || []);
    } catch (error) {
      console.error("Erro ao buscar alunos", error);
      setAlunosDoBanco([]);
      setMensagem({ texto: "Não foi possível carregar os alunos.", erro: true });
    }
  };

  useEffect(() => {
    const carregarTudo = async () => {
      try {
        const dadosAPI = await api.get<TurmaApiRaw[]>("/turmas");
        const turmasNormalizadas = dadosAPI.map(normalizarTurma);
        setTurmas(turmasNormalizadas);
        
        if (turmasNormalizadas.length > 0) {
          setTurmaSelecionada(turmasNormalizadas[0]);
          await buscarAlunosDaTurma(turmasNormalizadas[0].id);
        }
      } catch (error) {
        console.error("Erro ao carregar turmas", error);
        setMensagem({ texto: "Falha ao carregar as turmas.", erro: true });
      }
    };
    carregarTudo();
  }, []);

  const handleCriar = () => router.push("/turmas/criar");
  
  const handleEditar = () => {
    if (!turmaSelecionada) return;
    sessionStorage.setItem("turmaEdicao", JSON.stringify(turmaSelecionada));
    router.push("/turmas/criar");
  };

  const handleRemover = async () => {
    if (!turmaSelecionada || !confirm("Deseja realmente remover esta turma?")) return;

    try {
      await api.delete(`/turmas/${turmaSelecionada.id}`);
      const novaLista = turmas.filter((t) => t.id !== turmaSelecionada.id);
      setTurmas(novaLista);
      
      if (novaLista.length > 0) {
        setTurmaSelecionada(novaLista[0]);
        buscarAlunosDaTurma(novaLista[0].id);
      } else {
        setTurmaSelecionada(null);
        setAlunosDoBanco([]);
      }
      setMensagem({ texto: "Turma removida com sucesso.", erro: false });
    } catch (error) {
      setMensagem({ texto: "Erro ao remover a turma.", erro: true });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-slate-900 pb-10">
      <Header />
      <div className="w-full max-w-7xl mx-auto px-4 mt-8">
        <main className="w-full flex flex-col gap-6">
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">Gerenciar Turmas</h1>
          
          {mensagem.texto && (
            <div className={`p-4 rounded-lg ${mensagem.erro ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
              {mensagem.texto}
            </div>
          )}

          <div className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 p-6">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Selecionar Turma</label>
            <select
              value={turmaSelecionada?.id || ""}
              onChange={(e) => {
                const turma = turmas.find(t => t.id === e.target.value);
                if (turma) {
                  setTurmaSelecionada(turma);
                  buscarAlunosDaTurma(turma.id);
                }
              }}
              className="w-full h-11 px-4 bg-gray-50 dark:bg-slate-900 border rounded-lg text-sm mb-6"
            >
              {turmas.map(t => <option key={t.id} value={t.id}>{t.codigo} - {t.nome}</option>)}
            </select>

            <div className="flex gap-4 mb-8">
              <button onClick={handleCriar} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">Criar Nova</button>
              <button onClick={handleEditar} className="px-4 py-2 border rounded-lg text-sm">Editar</button>
              <button onClick={handleRemover} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm">Remover</button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-64 bg-gray-50 dark:bg-slate-900 p-6 rounded-xl">
                {turmaSelecionada && (
                  <>
                    <p className="text-xs uppercase font-bold text-gray-500">Turma: {turmaSelecionada.nome}</p>
                    <p className="text-sm mt-2">Código: {turmaSelecionada.codigo}</p>
                    <p className="text-sm">Alunos: {alunosDoBanco.length}</p>
                  </>
                )}
              </div>
              <div className="flex-1 bg-gray-50 dark:bg-slate-900 p-4 rounded-xl">
                <h4 className="text-xs font-bold uppercase mb-2">Alunos Matriculados</h4>
                {alunosDoBanco.map(a => <div key={a.id} className="p-2 border-b">{a.nome}</div>)}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}