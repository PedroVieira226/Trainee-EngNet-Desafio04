import { Module } from '@nestjs/common';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';
import { TurmasModule } from '../turmas/turmas.module';

@Module({
  imports: [TurmasModule],
  controllers: [AlunosController],
  providers: [AlunosService],
})
export class AlunosModule {}
