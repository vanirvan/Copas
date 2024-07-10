export type Link = {
  original_url: string;
  shorten_url: string;
};

type Arrayify<T> = {
  [K in keyof T]: T[K][];
};

export type LinkError = Arrayify<Link>;
