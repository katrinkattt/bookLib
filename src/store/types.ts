export type Book = {
  id?: string;
  title: string;
  description: string;
  file?: string;
};
export type Books = {
  books: Book[];
  loading: boolean;
};

export type TNavigationParams = {}
