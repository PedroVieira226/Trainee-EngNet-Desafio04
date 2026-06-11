import { Injectable, NotFoundException } from '@nestjs/common';
import { Aluno } from './interfaces/aluno.interface';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { TurmasService } from '../turmas/turmas.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AlunosService {
  private alunos: Aluno[] = [];

  constructor(private readonly turmasService: TurmasService) {}

  create(createAlunoDto: CreateAlunoDto): Aluno {
    const turmas = this.turmasService.findAll();
    const turmaExiste = turmas.find((t) => t.id === createAlunoDto.turmaId);

    if (!turmaExiste) {
      throw new NotFoundException('A turma informada não existe no sistema.');
    }

    const novoAluno: Aluno = {
      id: randomUUID(),
      ...createAlunoDto,
      criadoEm: new Date(),
    };
    
    this.alunos.push(novoAluno);
    return novoAluno;
  }

  findAll(): Aluno[] {
    return this.alunos;
  }
}
