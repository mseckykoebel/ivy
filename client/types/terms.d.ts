// TODO: we can break these down further :)
export interface Term {
  TermId: TermId;
  TermDescr: string;
  ShoppingCartDate: string;
  TermBeginDt: string;
  TermEndDt: string;
}

// TODO: not done - this is just covering all of the hypothetical termIDs, not broken down by CAREER yet
export type TermId = string;
