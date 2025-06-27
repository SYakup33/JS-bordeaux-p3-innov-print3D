declare module "rc-pagination" {
  import type * as React from "react";

  export interface PaginationProps {
    current?: number;
    total?: number;
    pageSize?: number;
    onChange?: (page: number) => void;
    itemRender?: (
      page: number,
      type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
      element: React.ReactNode,
    ) => React.ReactNode;
    style?: React.CSSProperties;
  }

  const Pagination: React.FC<PaginationProps>;
  export default Pagination;
}
