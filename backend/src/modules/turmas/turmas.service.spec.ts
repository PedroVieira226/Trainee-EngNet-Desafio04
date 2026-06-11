import { Test, TestingModule } from '@nestjs/testing';
import { TurmasService } from './turmas.service';
import * as crypto from 'crypto';

describe('TurmasService', () => {
  let service: TurmasService;

  // Arrange
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurmasService],
    }).compile();

    service = module.get<TurmasService>(TurmasService);

    // Limpa os mocks antes de cada teste para não haver vazamento de estado
    jest.clearAllMocks();
  });

  // Limpa os timers falsos após a execução da suíte
  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve ser instanciado corretamente', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('deve criar uma nova turma e retornar a turma criada (Caixa Preta - Regra de Negócio)', () => {
      // Arrange 
      const payload = {
        nome: 'Física I',
        codigo: 'FIS101',
        horario: 'Seg/Qua 08h-10h',
        quantidadeAlunos: 30,
      };

      // Act 
      const resultado = service.create(payload);

      // Assert 
      expect(resultado).toHaveProperty('id');
      expect(resultado.nome).toEqual('Física I');
      expect(resultado.codigo).toEqual('FIS101');
      expect(resultado.criadoEm).toBeInstanceOf(Date); 
    });

    it('deve invocar crypto.randomUUID e instanciar Date internamente (Caixa Branca - Estrutura Interna)', () => {
      // Arrange
      const payload = {
        nome: 'Química I',
        codigo: 'QUI101',
        horario: 'Ter/Qui 14h-16h',
        quantidadeAlunos: 25,
      };

      const mockId = '12345678-1234-1234-1234-123456789012';
      
      // Spy
      const cryptoSpy = jest.spyOn(crypto, 'randomUUID').mockReturnValue(mockId as any);
      
      // Fake Timers
      const dataFixa = new Date('2026-01-01T10:00:00Z');
      jest.useFakeTimers().setSystemTime(dataFixa);

      // Act
      const resultado = service.create(payload);

      // Assert 
      expect(cryptoSpy).toHaveBeenCalledTimes(1); 
      expect(resultado.id).toEqual(mockId); 
      expect(resultado.criadoEm).toEqual(dataFixa);
    });
  });

  describe('findAll()', () => {
    it('deve retornar todas as turmas cadastradas (Caixa Preta - Regra de Negócio)', () => {
      // Arrange 
      service.create({
        nome: 'Cálculo I',
        codigo: 'MAT101',
        horario: 'Ter/Qui 10h-12h',
        quantidadeAlunos: 40,
      });

      // Act
      const turmas = service.findAll();

      // Assert
      expect(turmas).toBeInstanceOf(Array);
      expect(turmas.length).toBe(1);
      expect(turmas[0].codigo).toEqual('MAT101');
    });

    it('deve retornar um array vazio caso não existam turmas (Caixa Preta - Valor Limite)', () => {
      // Act
      const turmas = service.findAll();

      // Assert
      expect(turmas).toBeInstanceOf(Array);
      expect(turmas.length).toBe(0);
    });
  });
});