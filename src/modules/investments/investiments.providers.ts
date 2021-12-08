import { Investment } from './entities/investment.entity';
import { INVESTMENTS_REPOSITORY } from '../../core/constants';

export const investmentsProviders = [
  {
    provide: INVESTMENTS_REPOSITORY,
    useValue: Investment,
  },
];
