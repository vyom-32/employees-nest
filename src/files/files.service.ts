import { Injectable } from '@nestjs/common';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  async uploadFileLocal(
    uploadPath: string,
    filename: string,
    file: Express.Multer.File,
  ) {
    const publicUploadPtah = 'public/' + uploadPath;

    const fileExtension = path.extname(file.originalname);

    const filePath = path.join(publicUploadPtah, `${filename}${fileExtension}`);

    try {
      await fsPromises.writeFile(filePath, file.buffer);
      console.log(
        'uploaded file to path:',
        filePath.replace('\\', '/').replace('public/', ''),
      );
      return { filePath: filePath.replace('\\', '/').replace('public/', '') };
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }
}
