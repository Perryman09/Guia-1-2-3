import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'kperryman@ejemplo.com' })
  email: string;

  @ApiProperty({ example: 'Kevin Perryman', required: false })
  name?: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty({ example: '12345678', required: false })
  telephone?: string;

  @ApiProperty({ example: 'USER', enum: ['USER', 'ADMIN'], required: false })
  role?: 'USER' | 'ADMIN';

  @ApiProperty({ example: 1, description: 'ID del Tenant asignado' })
  tenantId: number;
}