import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { Usuario } from "./modules/entities/usuario.entity";
import { Turma } from "./modules/entities/turma.entity";
import { Aluno } from "./modules/entities/aluno.entity";
import { Aula } from "./modules/entities/aula.entity";
import { Frequencia } from "./modules/entities/frequencia.entity";

import { AuthModule } from "./modules/auth/auth.module";
import { TurmasModule } from "./modules/turmas/turmas.module";
import { AlunosModule } from "./modules/alunos/alunos.module";
import { AulasModule } from "./modules/aulas/aulas.module";
import { FrequenciasModule } from "./modules/frequencias/frequencias.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { RelatoriosModule } from "./modules/relatorios/relatorios.module";
import { UsuariosModule } from "./modules/usuarios/usuarios.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),

    // Mudamos para forRootAsync para garantir que o ConfigService injete as envs corretamente
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>("DATABASE_URL");

        // Se houver DATABASE_URL (Ambiente do Railway)
        if (databaseUrl) {
          return {
            type: "postgres",
            url: databaseUrl,
            entities: [Usuario, Turma, Aluno, Aula, Frequencia],
            synchronize: false, // Segurança máxima em produção
            ssl: {
              rejectUnauthorized: false, // Necessário para a conexão externa com o Railway
            },
          };
        }

        // Fallback para o seu ambiente de desenvolvimento Local (localhost)
        return {
          type: "postgres",
          host: configService.get<string>("DB_HOST", "localhost"),
          port: configService.get<number>("DB_PORT", 5432),
          username: configService.get<string>("DB_USERNAME") || configService.get<string>("DB_USER", "postgres"),
          password: configService.get<string>("DB_PASSWORD", "postgres"),
          database: configService.get<string>("DB_DATABASE") || configService.get<string>("DB_NAME", "engnet_presenca"),
          entities: [Usuario, Turma, Aluno, Aula, Frequencia],
          synchronize: true, // Cria e altera tabelas automaticamente em dev
        };
      },
    }),

    AuthModule,
    TurmasModule,
    AlunosModule,
    AulasModule,
    FrequenciasModule,
    DashboardModule,
    RelatoriosModule,
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}