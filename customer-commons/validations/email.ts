const emailRegexSimple = new RegExp("[.*@*...*]");

export function isValidEmailStructure(value: string): boolean {
  return emailRegexSimple.test(value);
}
