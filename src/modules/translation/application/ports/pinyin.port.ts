export interface PinyinPort {
  toPinyin(chineseText: string): Promise<string>;
}