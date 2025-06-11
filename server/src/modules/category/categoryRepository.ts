import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type { Category } from "../../types/express/index";

class CategoryRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from category");

    return rows as (typeof Image)[];
  }
}

export default new CategoryRepository();
