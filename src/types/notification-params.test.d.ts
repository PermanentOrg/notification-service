export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveErrorMessage: (message: string) => R;
    }
  }
}
