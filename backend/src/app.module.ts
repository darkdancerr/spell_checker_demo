import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Document} from './document/document.entity';
import {DocumentModule} from './document/document.module';
import { SpellCheckerModule } from './spell-checker/spell-checker.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'postgres',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'spellchecker',
            entities: [Document],
            synchronize: true,
        }), DocumentModule, SpellCheckerModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
