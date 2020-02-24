import {Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import { Response } from 'express';
import {FileInterceptor} from '@nestjs/platform-express';
import {DocumentService} from './document.service';

@Controller('documents')
export class DocumentController {
    constructor(private documentsService: DocumentService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        return this.documentsService.saveDocumentAndCheckSpelling(file);
    }

    @Get('/:id')
    async getCorrectedDocument(@Param('id') id, @Res() res: Response) {
        const buffer = await this.documentsService.getCorrectedDocument(id);
        const stream = this.documentsService.getReadableStream(buffer);

        res.set({
            'Content-Type': 'text/plain',
            'Content-Length': buffer.length,
        });

        stream.pipe(res);
    }
}
