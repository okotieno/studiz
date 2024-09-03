import { Controller, Get, Param, Res } from '@nestjs/common';
import { FileUploadService } from './upload.service';
import { FileUploadModel } from '@studiz/backend/db';
// import { FastifyReply } from 'fastify';

@Controller('images')
export class ImageController {
  constructor(private readonly fileUploadService: FileUploadService) {
  }

  @Get(':imageId')
  async getImage(
    @Param('imageId') imageId: number,

    @Res() res: any,
  ) {
    try {
      const fileUpload = await this.fileUploadService.findById(imageId) as FileUploadModel;
      const objectName = fileUpload.name as string;

      const fileBuffer = await this.fileUploadService.getObject( objectName);
      res.header('Content-Disposition', `attachment; filename=${objectName}`);
      res.header('Content-Type', 'image/jpeg'); // Set appropriate content type for the image
      res.send(fileBuffer);
    } catch (error) {
      console.log({ error })
      res.status(500).send('Error downloading file');
    }
  }
}
