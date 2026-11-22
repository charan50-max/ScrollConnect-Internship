
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Registered email address of the user',
    example: 'charan@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password associated with the account',
    example: 'charan123',
  })
  @IsNotEmpty()
  password: string;
}
