import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';
enum Type {
  MALE = 'male',
  FEMALE = 'female',
}
export class InvestmentDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly value: number;

  @IsNotEmpty()
  readonly date: string;

  @IsEnum(Type, {
    message: 'Os tipos devem ser Renda Fixa ou Variável',
  })
  readonly type: Type;
}
