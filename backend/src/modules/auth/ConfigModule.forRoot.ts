import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o arquivo .env visível em qualquer lugar sem precisar reimportar
    }),
    AuthModule,
  ],
})
export class AppModule {}