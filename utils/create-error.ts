export default function createErrorProps(code: number, message: string) {
  return {
    props: {
      tokens: null,
      user: null,
      error: {
        code,
        message
      }
    }
  }
}