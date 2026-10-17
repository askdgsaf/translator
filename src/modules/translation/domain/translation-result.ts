import {Language} from './language';

export class TranslationResult {
    constructor(
        public readonly sourceText: string,
        public readonly source: Language,
        public readonly target: Language,

        public readonly translatedText: string,

        public readonly pronunciation: string,
    ) {}
}