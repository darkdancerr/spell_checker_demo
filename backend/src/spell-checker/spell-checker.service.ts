import {Inject, Injectable} from '@nestjs/common';
import {SpellChecker} from './spell-checker.provider';

@Injectable()
export class SpellCheckerService {
    dictionary: any;

    constructor(
        @Inject(SpellChecker) private spellchecker
    ) {
        this.spellchecker.getDictionary('en-GB', (err, result) => {
            if (err) {
                console.log(err);
            }
            this.dictionary = result;
        });
    }

    getMisspelledWords(words: string[]): string[] {
        const invalidWords = [];
        words.forEach((word) => {
            if (this.dictionary.isMisspelled(word)) {
                invalidWords.push(word);
            }
        });
        return invalidWords;
    }

    correctWordsIfMisspelled(words: string[]): string[] {
        words.forEach((word) => {
            if (this.dictionary.isMisspelled(word)) {
                const suggestion = this.dictionary.getSuggestions(word, 1)[0];
                if (suggestion) {
                    const index = words.indexOf(word);
                    words[index] = suggestion;
                }
            }
        });
        return words;
    }
}
