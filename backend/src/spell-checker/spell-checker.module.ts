import { Module } from '@nestjs/common';
import { SpellCheckerService } from './spell-checker.service';
import {spellCheckerProvider} from './spell-checker.provider';

@Module({
    providers: [spellCheckerProvider, SpellCheckerService],
    exports: [spellCheckerProvider, SpellCheckerService]
})
export class SpellCheckerModule {}
