import { Test, TestingModule } from '@nestjs/testing';
import { TurmasController } from './turmas.controller';
import { TurmasService } from './turmas.service';

describe('TurmasController', () => {
  let controller: TurmasController;
  let service: TurmasService;

  const mockTurmasService = {
    criar: jest.fn(),
    listarTodas: jest.fn(),
    remover: jest.fn(),
    atualizar: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurmasController],
      providers: [
        {
          provide: TurmasService,
          useValue: mockTurmasService,
        },
      ],
    }).compile();

    controller = module.get<TurmasController>(TurmasController);
    service = module.get<TurmasService>(TurmasService);

    jest.clearAllMocks();
  });

  it('deve ser instanciado corretamente', () => {
    expect(controller).toBeDefined();
  });

  describe('criar()', () => {
    it('deve repassar o dto e o professorId para o service', async () => {
      const dto: any = { nome: 'Nova Turma' };
      const req = { user: { id: 'prof-123' } };
      mockTurmasService.criar.mockResolvedValue({ id: '1', ...dto });

      const result = await controller.criar(dto, req);

      expect(service.criar).toHaveBeenCalledWith(dto, 'prof-123');
      expect(result).toEqual({ id: '1', ...dto });
    });
  });

  describe('listarTodas()', () => {
    it('deve buscar turmas usando o professorId', async () => {
      const req = { user: { id: 'prof-123' } };
      mockTurmasService.listarTodas.mockResolvedValue([{ id: '1' }]);

      const result = await controller.listarTodas(req);

      expect(service.listarTodas).toHaveBeenCalledWith('prof-123');
      expect(result).toEqual([{ id: '1' }]);
    });
  });
});
