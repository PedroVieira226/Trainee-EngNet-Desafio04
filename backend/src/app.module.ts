import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/user.module';
import { TurmasModule } from './modules/turmas/turmas.module';
import { AlunosModule } from './modules/alunos/alunos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    TurmasModule,
    AlunosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}