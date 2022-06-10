// TODO: we can break these down further :)
export interface Term {
  TermId: string;
  TermDescr: string;
  ShoppingCartDate: string;
  TermBeginDt: string;
  TermEndDt: string;
}

// TODO: not done - this is just covering all of the hypothetical termIDs, not broken down by CAREER yet
export type TermId = "5030" | "5020" | "5010" | "5000" | "4990" | "4980";
