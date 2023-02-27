export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toGenerateErrorMessage: (arg: unknown, message: string) => R;
    }
  }
}
