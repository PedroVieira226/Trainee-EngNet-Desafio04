import { Injectable, NotFoundException } from '@nestjs/common';
import { Turma } from './interfaces/turma.interface';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TurmasService {
  // Mock Repository Pattern
  private turmas: Turma[] = [];

  create(createTurmaDto: CreateTurmaDto): Turma {
    const novaTurma: Turma = {
      id: randomUUID(),
      ...createTurmaDto,
      criadoEm: new Date(),
    };
    this.turmas.push(novaTurma);
    return novaTurma;
  }

  findAll(): Turma[] {
    return this.turmas;
  }
}
