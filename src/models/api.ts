interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
}

export interface Response<T> {
  results: T[];
  info: Info;
}
