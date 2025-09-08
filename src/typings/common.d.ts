export type Pagination = {
  page?: number;
  limit?: number;
};

export type ListResponse<T = any> = {
  items: T[];
  total: number;
};

export type PaginationWithName = {
  page?: number;
  limit?: number;
  name?: string;
};

export type Option = {
  label: string;
  value: string;
};

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type OrderByType = 'asc' | 'desc';

export type ObjectType<T = string> = {
  [k in string]: T;
};
