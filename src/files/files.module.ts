// files.module.ts
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  providers: [FilesService, FilesController],
  exports: [FilesService, FilesController],
  controllers: [],
  //   imports: [FilesService],
})
export class FilesModule {}
