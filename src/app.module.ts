import { BadRequestException, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';
import { DatabaseService } from './db/database.service';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import { FilesController } from './files/files.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Ensures ConfigService is available globally
    }),
    DatabaseModule,
    FilesModule,
  ],
  controllers: [AppController, FilesController],
  providers: [AppService, DatabaseService, FilesService],
})
export class AppModule {}
