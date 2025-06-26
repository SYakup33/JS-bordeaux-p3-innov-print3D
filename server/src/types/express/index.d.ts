// to make the file a module and avoid the TypeScript error
export type {};

declare global {
  // types à mettre
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      /* ************************************************************************* */
    }
  }
}
