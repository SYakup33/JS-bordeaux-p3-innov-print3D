import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type { Product } from "../../types/express/index";

class ProductRepository {
  async findAll() {
    const [productRows] = await databaseClient.query<Rows>(
      "SELECT p.id, p.name, p.description, p.price, c.name AS categoryName FROM product p LEFT JOIN category c ON p.category_id = c.id",
    );

    for (const product of productRows) {
      const [imageRows] = await databaseClient.query<Rows>(
        "SELECT path FROM image WHERE product_id = ?",
        [product.id],
      );
      product.images = imageRows.map((img) => img.path);
    }

    return productRows as Product[];
  }
}

export default new ProductRepository();
