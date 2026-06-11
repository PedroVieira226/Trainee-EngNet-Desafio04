import { Module } from '@nestjs/common';
import { TurmasModule } from './modules/turmas/turmas.module';
import { AlunosModule } from './modules/alunos/alunos.module';

@Module({
  imports: [TurmasModule, AlunosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
