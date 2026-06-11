import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  //injeta o JwtService 
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const { email, senha } = loginDto;

    //GERADOR DE HASH TEMPORÁRIO (SÓ PARA DESCOBRIR O VALOR REAL NO DOCKER)
    //tudo isso vem do banco depois  
    const hashGeradoNaHora = await bcrypt.hash('passwordprof123', 10);
    console.log('====================================');
    console.log('HASH REAL DA SENHA:', hashGeradoNaHora); 
    console.log('====================================');

    // SIMULAÇÃO DE BANCO DE DADOS (Parâmetros de Produção)
    
    const professorSimulado = {
      id: 'id-professor-fga-2026',
      email: 'professor@engnet.com',
      
      senhaHash: hashGeradoNaHora, 
      role: 'professor',
    };

    // 1. Verificar se o e-mail bate com o usuário simulado
    if (email !== professorSimulado.email) {
      
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // 2. Comparar a senha digitada (limpa) com o hash simulado do banco
    const senhaBate = await bcrypt.compare(senha, professorSimulado.senhaHash);

    if (!senhaBate) {
      // Retorna 401 se a senha estiver errada
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // 3. Gerar o payload do JWT (dados não-sensíveis que vão dentro do token)
    const payload = { 
      sub: professorSimulado.id, 
      email: professorSimulado.email, 
      role: professorSimulado.role 
    };

    // 4. Retornar o token JWT assinado
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}