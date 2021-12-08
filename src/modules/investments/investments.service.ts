import { Inject, Injectable } from '@nestjs/common';
import { INVESTMENTS_REPOSITORY } from 'src/core/constants';
import { User } from '../users/user.entity';
import { InvestmentDto } from './dto/investment.dto';
import { Investment } from './entities/investment.entity';

@Injectable()
export class InvestmentsService {
  constructor(
    @Inject(INVESTMENTS_REPOSITORY)
    private readonly investmentsRepository: typeof Investment,
  ) {}
  async create(investment: any, userId): Promise<Investment> {
    return await this.investmentsRepository.create<Investment>({
      ...investment,
      userId,
    });
  }

  async findAll(userId): Promise<Investment[]> {
    return await this.investmentsRepository.findAll({
      where: { userId },
    });
  }

  async delete(id, userId) {
    return await this.investmentsRepository.destroy({ where: { id, userId } });
  }
}
