import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/upload')
  @UseInterceptors(AnyFilesInterceptor())
  getStatistics(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    return this.filesService.uploadFileLocal(
      body.filePath,
      body.fileName,
      files[0],
    );
  }
}
