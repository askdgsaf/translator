import {Language} from './language';
import {InvalidTranslationRequestError } from './errors';

export class TranslationRequest {
    private constructor(
        public readonly text: string,
        public readonly source: Language,
        public readonly target: Language,
    ) {}

    static create(text: string, source: Language, target: Language): TranslationRequest {
        const trimmed = text.trim();

        if (trimmed.length === 0) {
            throw new InvalidTranslationRequestError('Text must not be empty');
        }
        if (trimmed.length > 1000) {
            throw new InvalidTranslationRequestError('Text must be at most 1000 characters');
        }
        if(source === target) {
            throw new InvalidTranslationRequestError('source and target languages must differ');
        }

        return new TranslationRequest(trimmed, source, target);
    }
}