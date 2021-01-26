import { IsEnum, IsString, IsUUID } from 'class-validator';
import { ChangeRoleInput } from '../../graphql';
import { userRole } from '@tomasztrebacz/nest-auth-graphql-redis';

export class ChangeRoleDto extends ChangeRoleInput {
  @IsUUID()
  id: string;

  @IsEnum(userRole)
  @IsString()
  role: userRole;
}
