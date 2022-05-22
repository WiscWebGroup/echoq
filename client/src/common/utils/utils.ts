export function containsSpecialChars(str: string): boolean {
  // underscore '_' is allowed
  const specialChars = /[`!@#$%^&*()+\-=[\]{};':"\\|,.<>/?~]/
  return specialChars.test(str)
}
