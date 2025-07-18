import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SetController } from './set.controller';
import { SetService } from './set.service';
import { Set, SetSchema } from '../schemas/set.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Set.name, schema: SetSchema }])
  ],
  controllers: [SetController],
  providers: [SetService],
  exports: [SetService]
})
export class SetModule {} 