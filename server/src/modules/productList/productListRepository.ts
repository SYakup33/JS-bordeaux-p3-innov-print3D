import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type ProductList = {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
};

class ProductListRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from product");

    return rows as ProductList[];
  }
}

export default new ProductListRepository();
