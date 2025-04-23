import { JSX } from "react";

export type Column<T> = {
  header: string;
  width: string;
  key: string;
  render: (item: T, index: number) => string | number | JSX.Element;
};

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  minRows?: number;
};
