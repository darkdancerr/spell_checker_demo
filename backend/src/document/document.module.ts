import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DocumentController} from './document.controller';
import {DocumentService} from './document.service';
import {Document} from './document.entity';
import {SpellCheckerModule} from '../spell-checker/spell-checker.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Document]),
        SpellCheckerModule
    ],
    controllers: [DocumentController],
    providers: [DocumentService],
})
export class DocumentModule {
}
