import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type { Product } from "../../types/express/index";

class ProductRepository {
  async findBy(filters: ProductFilters) {
    const conditions = [];
    const values = [];

    const { name, category_id, minPrice, maxPrice } = filters;

    if (name) {
      conditions.push("p.name LIKE ?");
      values.push(`%${name}%`);
    }

    if (category_id) {
      conditions.push("c.id = ?");
      values.push(category_id);
    }

    if (minPrice) {
      conditions.push("p.price >= ?");
      values.push(minPrice);
    }

    if (maxPrice) {
      conditions.push("p.price <= ?");
      values.push(maxPrice);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const query = `
      SELECT p.id, p.name, p.description, p.price, c.name AS categoryName
      FROM product p
      LEFT JOIN category c ON p.category_id = c.id
      ${whereClause}
    `;

    const [productRows] = await databaseClient.query<Rows>(query, values);

    for (const product of productRows) {
      const [imageRows] = await databaseClient.query<Rows>(
        "SELECT path FROM image WHERE product_id = ?",
        [product.id],
      );
      product.images = imageRows.map((img) => img.path);
    }

    return productRows as Product[];
  }

  async find(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM product WHERE id = ?",
      [id],
    );

    if (rows.length === 0) return null;

    const product = rows[0];

    const [imageRows] = await databaseClient.query<Rows>(
      "SELECT path FROM image WHERE product_id = ?",
      [product.id],
    );

    product.images = imageRows.map((img) => img.path);

    const [categoryRows] = await databaseClient.query<Rows>(
      "SELECT name FROM category WHERE id = ?",
      [product.category_id],
    );
    product.category_name = categoryRows[0]?.name || "";

    return product as Product;
  }
}
export default new ProductRepository();
