import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')//define o prefixo como /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK) // Força o retorno do status HTTP 200 ao invés de 201
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);//repassa a requisicao para o service
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard) //  o guard entra aqui trancando a rota
  getProfile(@Req() req) {
    //se o token for válido, o nest injeta os dados do user dentro de req.user
    return {
      mensagem: 'Você acessou uma rota privada com sucesso!',
      usuario: req.user,
    };
  }
}