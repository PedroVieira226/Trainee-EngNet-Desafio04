import { Test, TestingModule } from '@nestjs/testing';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';

describe('AlunosController', () => {
  let controller: AlunosController;
  let service: AlunosService;

  // Mock do AlunosService
  const mockAlunosService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunosController],
      providers: [
        {
          provide: AlunosService,
          useValue: mockAlunosService,
        },
      ],
    }).compile();

    controller = module.get<AlunosController>(AlunosController);
    service = module.get<AlunosService>(AlunosService);

    jest.clearAllMocks();
  });

  it('deve ser instanciado corretamente', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('deve delegar a criação do aluno para o AlunosService e retornar o resultado (Caixa Branca - Spy/Mock)', () => {
      // Arrange
      const dto: CreateAlunoDto = {
        nome: 'João Silva',
        email: 'joao@email.com',
        matricula: '2026001',
        turmaId: 'turma-123',
      };

      const resultadoMockado = {
        id: 'mock-id-aluno',
        ...dto,
        criadoEm: new Date(),
      };

      mockAlunosService.create.mockReturnValue(resultadoMockado);

      // Act
      const resultado = controller.create(dto);

      // Assert
      // Validamos o Controller
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(resultado).toEqual(resultadoMockado);
    });
  });

  describe('findAll()', () => {
    it('deve solicitar todos os alunos ao AlunosService e retornar o resultado (Caixa Branca - Spy/Mock)', () => {
      // Arrange
      const resultadoMockado = [
        {
          id: 'mock-id-aluno',
          nome: 'João Silva',
          email: 'joao@email.com',
          matricula: '2026001',
          turmaId: 'turma-123',
          criadoEm: new Date(),
        },
      ];

      mockAlunosService.findAll.mockReturnValue(resultadoMockado);

      // Act
      const resultado = controller.findAll();

      // Assert
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(resultado).toEqual(resultadoMockado);
    });
  });
});
