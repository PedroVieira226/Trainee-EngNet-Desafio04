import { Test, TestingModule } from '@nestjs/testing';
import { TurmasController } from './turmas.controller';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';

describe('TurmasController', () => {
  let controller: TurmasController;
  let service: TurmasService;

  // Mock do TurmasService
  const mockTurmasService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurmasController],
      providers: [
        {
          provide: TurmasService,
          useValue: mockTurmasService, // mock
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

  describe('create()', () => {
    it('deve repassar o CreateTurmaDto para o TurmasService e retornar o resultado (Caixa Branca - Spy/Mock)', () => {
      // Arrange
      const dto: CreateTurmaDto = {
        nome: 'Física I',
        codigo: 'FIS101',
        horario: 'Seg/Qua 08h-10h',
        quantidadeAlunos: 30,
      };

      const resultadoMockado = {
        id: 'mock-id-123',
        ...dto,
        criadoEm: new Date(),
      };

      // Mock
      mockTurmasService.create.mockReturnValue(resultadoMockado);

      // Act
      const resultado = controller.create(dto);

      // Assert
      // 1. Validamos se o controller delegou corretamente para o service
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(dto);
      
      // 2. Validamos se o controller retornou exatamente o que o service devolveu
      expect(resultado).toEqual(resultadoMockado);
    });
  });

  describe('findAll()', () => {
    it('deve solicitar todas as turmas ao TurmasService e retornar a lista (Caixa Branca - Spy/Mock)', () => {
      // Arrange
      const resultadoMockado = [
        {
          id: 'mock-id-123',
          nome: 'Física I',
          codigo: 'FIS101',
          horario: 'Seg/Qua 08h-10h',
          quantidadeAlunos: 30,
          criadoEm: new Date(),
        },
      ];

      mockTurmasService.findAll.mockReturnValue(resultadoMockado);

      // Act
      const resultado = controller.findAll();

      // Assert
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(resultado).toEqual(resultadoMockado);
    });
  });
});
