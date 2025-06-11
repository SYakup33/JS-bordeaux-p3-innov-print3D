import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type { ProductList } from "../../types/express/index";

class ProductListRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from product");

    return rows as ProductList[];
  }
}

export default new ProductListRepository();
