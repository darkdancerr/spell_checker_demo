import {Provider} from '@nestjs/common';
import * as SpellCheckerLib from 'simple-spellchecker';

export const SpellChecker = 'lib:simple-spellchecker';

export const spellCheckerProvider: Provider = {
    provide: SpellChecker,
    useValue: SpellCheckerLib,
};

