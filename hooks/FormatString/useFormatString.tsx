let formatWord: string[] = [];

export default function useFormatString(word: string): string {
  word = word.toLowerCase();
  formatWord = [...word];
  formatWord[0] = word[0].toLocaleUpperCase();
  word = formatWord.join("");
  return word;
}
