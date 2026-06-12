import { IsString, IsNotEmpty, IsEmail, IsUUID } from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  matricula: string;

  @IsEmail({}, { message: 'O e-mail fornecido é inválido.' })
  @IsNotEmpty()
  email: string;

  @IsUUID('4', { message: 'O ID da turma deve ser um UUID válido.' })
  @IsNotEmpty()
  turmaId: string;
}
