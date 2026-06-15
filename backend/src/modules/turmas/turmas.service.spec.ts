import { Test, TestingModule } from '@nestjs/testing';
import { TurmasService } from './turmas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Turma } from '../entities/turma.entity';

describe('TurmasService', () => {
  let service: TurmasService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      loadRelationCountAndMap: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TurmasService,
        {
          provide: getRepositoryToken(Turma),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TurmasService>(TurmasService);

    jest.clearAllMocks();
  });

  it('deve ser instanciado corretamente', () => {
    expect(service).toBeDefined();
  });

  describe('criar()', () => {
    it('deve criar uma turma com sucesso', async () => {
      const dto: any = { nome: 'Turma A' };
      const mockResult = { id: '1', ...dto, professor: { id: 'prof-1' } };
      
      mockRepository.create.mockReturnValue(mockResult);
      mockRepository.save.mockResolvedValue(mockResult);

      const result = await service.criar(dto, 'prof-1');

      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledWith(mockResult);
      expect(result).toEqual(mockResult);
    });
  });

  describe('listarTodas()', () => {
    it('deve listar turmas', async () => {
      const result = await service.listarTodas('prof-1');
      expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('turma');
      expect(result).toEqual([]);
    });
  });
});