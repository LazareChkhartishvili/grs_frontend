import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from '../schemas/video.schema';
import { Set, SetSchema } from '../schemas/set.schema';
import { MigrationService } from './migration.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
      { name: Set.name, schema: SetSchema },
    ]),
  ],
  providers: [MigrationService],
  exports: [MigrationService],
})
export class MigrationModule {} 