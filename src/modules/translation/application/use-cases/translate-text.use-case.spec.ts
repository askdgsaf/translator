import { TranslateTextUseCase } from './translate-text.use-case';
import { TranslationProviderPort } from '../ports/translation-provider.port';
import { PinyinPort } from '../ports/pinyin.port';
import { PhoneticPort } from '../ports/phonetic.port';
import { TranslationRequest } from '../../domain/translation-request';
import { InvalidTranslationRequestError } from '../../domain/errors';

// ---- Fake adapters (hand-written, no libraries) ----

class FakeProvider implements TranslationProviderPort {
  calls: TranslationRequest[] = [];
  constructor(private readonly output: string) {}

  async translate(request: TranslationRequest): Promise<string> {
    this.calls.push(request);
    return this.output;
  }
}

class FakePinyin implements PinyinPort {
  calls: string[] = [];
  async toPinyin(text: string): Promise<string> {
    this.calls.push(text);
    return 'FAKE-PINYIN';
  }
}

class FakePhonetic implements PhoneticPort {
  calls: string[] = [];
  async toPhonetic(text: string): Promise<string> {
    this.calls.push(text);
    return 'FAKE-IPA';
  }
}

describe('TranslateTextUseCase', () => {
  function setup(providerOutput: string) {
    const provider = new FakeProvider(providerOutput);
    const pinyin = new FakePinyin();
    const phonetic = new FakePhonetic();
    const useCase = new TranslateTextUseCase(provider, pinyin, phonetic);
    return { provider, pinyin, phonetic, useCase };
  }

  it('translates English to Chinese and returns pinyin', async () => {
    const { useCase, pinyin, phonetic } = setup('你好');

    const result = await useCase.execute({ text: 'Hello', source: 'en', target: 'zh' });

    expect(result.translatedText).toBe('你好');
    expect(result.pronunciation).toBe('FAKE-PINYIN');
    expect(pinyin.calls).toEqual(['你好']);
    expect(phonetic.calls).toHaveLength(0);
  });

  it('translates Chinese to English and returns phonetic text', async () => {
    const { useCase, pinyin, phonetic } = setup('Hello');

    const result = await useCase.execute({ text: '你好', source: 'zh', target: 'en' });

    expect(result.translatedText).toBe('Hello');
    expect(result.pronunciation).toBe('FAKE-IPA');
    expect(phonetic.calls).toEqual(['Hello']);
    expect(pinyin.calls).toHaveLength(0);
  });

  it('trims the input before translating', async () => {
    const { useCase, provider } = setup('你好');

    const result = await useCase.execute({ text: '  Hello  ', source: 'en', target: 'zh' });

    expect(result.sourceText).toBe('Hello');
    expect(provider.calls[0].text).toBe('Hello');
  });

  it('rejects invalid requests without calling any adapter', async () => {
    const { useCase, provider } = setup('x');

    await expect(
      useCase.execute({ text: '   ', source: 'en', target: 'zh' }),
    ).rejects.toThrow(InvalidTranslationRequestError);

    await expect(
      useCase.execute({ text: 'Hello', source: 'en', target: 'en' }),
    ).rejects.toThrow(InvalidTranslationRequestError);

    expect(provider.calls).toHaveLength(0);
  });
});