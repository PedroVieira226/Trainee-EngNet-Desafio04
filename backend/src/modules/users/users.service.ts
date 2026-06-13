import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-users.dto';
import { UserEntity } from '../auth/entities/user.entity'; 

@Injectable()
export class UsersService {
  // Array em memória simulando a tabela de usuários usando a estrutura da sua Entity
  private usersTable: UserEntity[] = [];

  async create(createUserDto: CreateUserDto) {
    const { email, senha, nome } = createUserDto;

    // 1. [Critério de Aceitação] Verificar se o e-mail já existe na tabela mockada
    const userExists = this.usersTable.find(user => user.email === email);
    if (userExists) {
      throw new ConflictException('Este e-mail já está cadastrado no sistema');
    }

    // 2. [Critério de Aceitação] Hashing da senha com Bcrypt (salt = 10)
    const saltRounds = 10;
    const hashDaSenha = await bcrypt.hash(senha, saltRounds);

    // 3. Montar o objeto final seguindo estritamente os campos da UserEntity
    const novoUsuario: UserEntity = {
      id: `user_${Math.random().toString(36).substr(2, 9)}`, // ID temporário string
      nome,
      email,
      senha: hashDaSenha, // Armazena o hash criptografado
      role: 'PROFESSOR',  // Define uma role padrão para os cadastros iniciais
    };

    // Salva na tabela fake
    this.usersTable.push(novoUsuario);

    // Print no terminal do Docker para monitorarmos o banco mockado
    console.log('====================================');
    console.log('BANCO MOCKADO ATUALIZADO:', this.usersTable);
    console.log('====================================');

    // 4. Retorna a resposta limpando a senha por segurança
    return {
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      role: novoUsuario.role,
      mensagem: 'Usuário cadastrado com sucesso!',
    };
  }
}