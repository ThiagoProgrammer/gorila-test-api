import { Module } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';
import { investmentsProviders } from './investiments.providers';

@Module({
  providers: [InvestmentsService, InvestmentsService, ...investmentsProviders],
  controllers: [InvestmentsController],
})
export class InvestmentsModule {}
