import { TranslationRequest } from '../../domain/translation-request';

export interface TranslationProviderPort {
  /** Returns the translated text: simplified Chinese (zh) or plain English (en). */
  translate(request: TranslationRequest): Promise<string>;
}