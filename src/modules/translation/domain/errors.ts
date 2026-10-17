export class InvalidTranslationRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidTranslationRequestError';
}
}