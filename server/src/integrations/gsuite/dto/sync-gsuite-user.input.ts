import { Field, InputType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SyncGsuiteUserInput {
  @Expose()
  @Field()
  @IsString()
  @IsNotEmpty()
  googleId: string;
}
