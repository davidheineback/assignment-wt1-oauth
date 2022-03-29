/**
 * Helper function to return a props object only containing error and setting other props to null.
 */
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