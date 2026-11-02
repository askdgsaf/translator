import { Language } from '../../domain/language';
import { TranslationRequest } from '../../domain/translation-request';
import { TranslationResult } from '../../domain/translation-result';
import { TranslationProviderPort } from '../ports/translation-provider.port';
import { PinyinPort } from '../ports/pinyin.port';
import { PhoneticPort } from '../ports/phonetic.port';

export interface TranslateTextCommand {
  text: string;
  source: Language;
  target: Language;
}

export class TranslateTextUseCase {
  constructor(
    private readonly provider: TranslationProviderPort,
    private readonly pinyin: PinyinPort,
    private readonly phonetic: PhoneticPort,
  ) {}

  async execute(command: TranslateTextCommand): Promise<TranslationResult> {
    const request = TranslationRequest.create(
      command.text,
      command.source,
      command.target,
    );

    const translatedText = await this.provider.translate(request);

    const pronunciation =
      request.target === 'zh'
        ? await this.pinyin.toPinyin(translatedText)
        : await this.phonetic.toPhonetic(translatedText);

    return new TranslationResult(
      request.text,
      request.source,
      request.target,
      translatedText,
      pronunciation,
    );
  }
}