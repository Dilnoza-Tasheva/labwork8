export interface IQuoteForm {
  author: string;
  category: string;
  text: string;
}

export interface IQuote {
  id: string;
  author: string;
  category: string;
  text: string;
}

export interface IQuoteApi {
  [id: string]: IQuote;
}