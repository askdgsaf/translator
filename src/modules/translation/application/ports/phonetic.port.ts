export interface PhoneticPort {
  toPhonetic(englishText: string): Promise<string>;
}