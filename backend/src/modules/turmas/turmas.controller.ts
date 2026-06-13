import { Controller, Get, Post, Body } from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';

@Controller('turmas')
export class TurmasController {
  // Injeção de Dependência
  constructor(private readonly turmasService: TurmasService) {}

  @Post()
  create(@Body() createTurmaDto: CreateTurmaDto) {
    // O ValidationPipe global garante que createTurmaDto é seguro
    return this.turmasService.create(createTurmaDto);
  }

  @Get()
  findAll() {
    return this.turmasService.findAll();
  }
}
