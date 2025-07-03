import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type { Product } from "../../types/express/index";

class ProductRepository {
  async findBy(
    name: unknown,
    categoryId: unknown,
    minPrice: unknown,
    maxPrice: unknown,
    description: unknown,
  ) {
    const query = `
    SELECT p.id, p.name, p.description, p.price, c.name AS categoryName 
    FROM product p 
    LEFT JOIN category c ON p.category_id = c.id
    WHERE (? IS NULL OR p.name LIKE ?)
      AND (? IS NULL OR c.id = ?)
      AND (? IS NULL OR p.price >= ?)
      AND (? IS NULL OR p.price <= ?)
      AND (? IS NULL OR p.description LIKE ?)
  `;

    const [productRows] = await databaseClient.query<Rows>(query, [
      name,
      `%${name}%`,
      categoryId,
      categoryId,
      minPrice,
      minPrice,
      maxPrice,
      maxPrice,
      description,
      `%${description}%`,
    ]);

    for (const product of productRows) {
      const [imageRows] = await databaseClient.query<Rows>(
        `SELECT path FROM image WHERE product_id = ${product.id}`,
      );
      product.images = imageRows.map((img) => img.path);
    }

    return productRows as Product[];
  }
}

export default new ProductRepository();
