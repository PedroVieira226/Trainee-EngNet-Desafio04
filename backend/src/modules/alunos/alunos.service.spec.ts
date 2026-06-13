import { Test, TestingModule } from '@nestjs/testing';
import { AlunosService } from './alunos.service';
import { TurmasService } from '../turmas/turmas.service';
import { NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';

describe('AlunosService', () => {
  let service: AlunosService;
  let turmasService: TurmasService;

  // Mock do TurmasService 
  const mockTurmasService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlunosService,
        {
          provide: TurmasService,
          useValue: mockTurmasService, // Injeção do mock
        },
      ],
    }).compile();

    service = module.get<AlunosService>(AlunosService);
    turmasService = module.get<TurmasService>(TurmasService);

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve ser instanciado corretamente', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('deve lançar NotFoundException se a turma informada não existir (Caixa Branca - Desvio Condicional e Tratamento de Erro)', () => {
      // Arrange
      const dto = {
        nome: 'João Silva',
        email: 'joao@email.com',
        matricula: '2026001',
        turmaId: 'id-turma-inexistente',
      };

      // Turma não existe
      mockTurmasService.findAll.mockReturnValue([]);

      // Act & Assert
      // O caminho de erro `if (!turmaExiste)` foi ativado corretamente
      expect(() => service.create(dto)).toThrow(NotFoundException);
      expect(() => service.create(dto)).toThrow('A turma informada não existe no sistema.');
      
      // Validação de comportamento
      expect(turmasService.findAll).toHaveBeenCalledTimes(2); // Foi chamado 2x por causa dos 2 expects
    });

    it('deve criar o aluno com sucesso e interagir com nativos corretamente (Híbrido - Regra de Negócio e Estrutura)', () => {
      // Arrange
      const dto = {
        nome: 'Maria Souza',
        email: 'maria@email.com',
        matricula: '2026002',
        turmaId: 'id-turma-valida',
      };

      // Simulamos que o findAll de turmas encontrou a turma que o usuário requisitou
      mockTurmasService.findAll.mockReturnValue([
        { id: 'id-turma-valida', nome: 'Física I' }
      ]);

      const mockId = 'uuid-mockado-aluno';
      const cryptoSpy = jest.spyOn(crypto, 'randomUUID').mockReturnValue(mockId as any);

      const dataFixa = new Date('2026-05-01T12:00:00Z');
      jest.useFakeTimers().setSystemTime(dataFixa);

      // Act
      const resultado = service.create(dto);

      // Assert 
      expect(resultado).toHaveProperty('id');
      expect(resultado.nome).toEqual('Maria Souza');
      expect(resultado.turmaId).toEqual('id-turma-valida');
      
      // Assert 
      expect(turmasService.findAll).toHaveBeenCalledTimes(1); // Garante a chamada externa
      expect(cryptoSpy).toHaveBeenCalledTimes(1); // Garante a geração via módulo nativo
      expect(resultado.id).toEqual(mockId); // Repasse íntegro do ID gerado
      expect(resultado.criadoEm).toEqual(dataFixa); // Sincronicidade do relógio do sistema
    });
  });

  describe('findAll()', () => {
    it('deve retornar um array vazio caso não existam alunos (Caixa Preta - Valor Limite)', () => {
      // Act
      const resultado = service.findAll();
      
      // Assert
      expect(resultado).toEqual([]);
    });

    it('deve retornar a lista contendo os alunos cadastrados (Caixa Preta - Manutenção de Estado)', () => {
      // Arrange
      mockTurmasService.findAll.mockReturnValue([
        { id: 'turma-1' }
      ]);
      
      service.create({
        nome: 'Carlos',
        email: 'carlos@email.com',
        matricula: '2026003',
        turmaId: 'turma-1',
      });

      // Act
      const alunos = service.findAll();

      // Assert
      expect(alunos).toBeInstanceOf(Array);
      expect(alunos.length).toBe(1);
      expect(alunos[0].nome).toEqual('Carlos');
    });
  });
});
