// Extensão direta do Express (sem import/export)
declare namespace Express {
  export interface Request {
    user?: { id: number };
  }
}