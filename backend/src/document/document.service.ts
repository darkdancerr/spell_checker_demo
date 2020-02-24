import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Document} from './document.entity';
import {Repository} from 'typeorm';
import {SpellCheckerService} from '../spell-checker/spell-checker.service';
import {Readable} from 'stream';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(Document)
        private documentRepository: Repository<Document>,
        private spellCheckerService: SpellCheckerService
    ) {
    }

    saveDocumentAndCheckSpelling(file: any): Promise<string[]> {
        const fileBuffer = file.buffer;
        const document = new Document(fileBuffer);

        return this.documentRepository.save(document).then(result =>
            this.spellCheckerService.getMisspelledWords(result.content.toString().split(' ')));
    }

    getCorrectedDocument(id: number): Promise<Buffer> {
        const correctedWords = this.documentRepository.findOne(id).then(result =>
            this.spellCheckerService.correctWordsIfMisspelled(result.content.toString().split(' ')));

        return correctedWords.then(words => Buffer.from(words.join(' '), 'utf8'))
    }

    getReadableStream(buffer: Buffer): Readable {
        const stream = new Readable();

        stream.push(buffer);
        stream.push(null);

        return stream;
    }
}
