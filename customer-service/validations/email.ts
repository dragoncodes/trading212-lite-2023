const emailRegexSimple = new RegExp("[.*@*...*]");

export function isValidEmail(value: string): boolean {
  return emailRegexSimple.test(value);
}
