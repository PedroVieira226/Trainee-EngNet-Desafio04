import { Controller, Post, Body, UnauthorizedException, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const usuarioValidado = await this.authService.validarUsuario(loginDto.email, loginDto.senha);
    
    if (!usuarioValidado) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = await this.authService.login(usuarioValidado);

    // Configuração ajustada para Cross-Domain (Vercel <-> Railway)
    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: true,          // Forçado true para garantir HTTPS em produção
      sameSite: 'none',      // Permitir tráfego entre domínios diferentes
      maxAge: 3600000,
    });

    return { message: 'Login realizado com sucesso' };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    // Ajustado também no logout para limpar corretamente o cookie cross-domain
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return { message: 'Logout realizado com sucesso' };
  }
}