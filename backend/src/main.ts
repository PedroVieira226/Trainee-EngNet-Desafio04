import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ExpressAdapter } from "@nestjs/platform-express";
import cookieParser from "cookie-parser"; 
import helmet from "helmet";
import express = require("express"); 

const server = express(); 

server.use((req, res, next) => {
  if (req.url.startsWith('/_backend')) {
    req.url = req.url.replace('/_backend', '');
    if (!req.url.startsWith('/')) {
      req.url = '/' + req.url;
    }
  }
  next();
});

let isAppInitialized = false;

// Função centralizada de configuração compartilhada entre local e nuvem
async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.use(helmet());
  app.use(cookieParser());

  app.enableCors({
    origin: ["http://localhost:3001", "http://localhost:3000", /\.vercel\.app$/],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  return app;
}

// 🚀 AMBIENTE LOCAL (DOCKER / MÁQUINA FISICA)
// Se NÃO estiver rodando na Vercel, inicia o servidor HTTP tradicional na porta 3000
if (!process.env.VERCEL) {
  bootstrap().then(async (app) => {
    // Escuta explicitamente na interface '0.0.0.0' para permitir conexões do Docker
    await app.listen(3000, '0.0.0.0');
    console.log("🚀 Backend HTTP rodando com sucesso localmente na porta 3000 (0.0.0.0)!");
  });
}

// ☁️ AMBIENTE DE PRODUÇÃO (VERCEL SERVERLESS)
// Mantém o export padrão para a Vercel conseguir envelopar a rota
export default async (req: any, res: any) => {
  if (!isAppInitialized) {
    const app = await bootstrap();
    await app.init();
    isAppInitialized = true;
  }

  return server(req, res);
};