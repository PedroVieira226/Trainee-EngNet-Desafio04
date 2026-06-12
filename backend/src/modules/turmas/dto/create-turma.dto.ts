import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTurmaDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome da turma é obrigatório.' })
  nome: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  horario: string;

  @IsNumber()
  @Min(1, { message: 'A turma deve ter capacidade para pelo menos 1 aluno.' })
  quantidadeAlunos: number;
}
