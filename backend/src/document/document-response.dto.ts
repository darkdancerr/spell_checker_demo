export class DocumentResponseDto {
    id: number;
    misspelledWords: string[];

    constructor(id: number, misspelledWords: string[]) {
        this.id = id;
        this.misspelledWords = misspelledWords;
    }
}
