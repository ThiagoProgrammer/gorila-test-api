import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentDto } from './dto/investment.dto';
import { AuthGuard } from '@nestjs/passport';
import { Investment as InvestmentEntity } from './entities/investment.entity';

@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() investment: InvestmentDto,
    @Request() req,
  ): Promise<InvestmentEntity> {
    return await this.investmentsService.create(investment, req.user.id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Request() req) {
    const investments = await this.investmentsService.findAll(req.user.id);
    return {
      items: investments,
      totalRendaFixa: investments
        .filter((x) => x.type.includes('RENDA_FIXA'))
        .reduce((acc: any, curr) => acc + curr.value, 0),
      totalRendaVariavel: investments
        .filter((x) => x.type.includes('RENDA_VARIAVEL'))
        .reduce((acc: any, curr) => acc + curr.value, 0),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const deleted = await this.investmentsService.delete(id, req.user.id);

    if (deleted === 0) {
      throw new NotFoundException('Esse investimento não existe!');
    }

    return { message: 'Investimento removido com sucesso!' };
  }
}
