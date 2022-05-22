export function containsSpecialChars(str: string): boolean {
  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
  return specialChars.test(str)
}
