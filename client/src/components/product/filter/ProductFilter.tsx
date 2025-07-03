function ProductsFilter({
  productName,
  productNameChange,
  minPrice,
  minPriceChange,
  maxPrice,
  maxPriceChange,
  category,
  categoryChange,
}) {
  return (
    <>
      <input
        type="text"
        placeholder="Recherche par nom"
        value={productName ?? ""}
        onChange={productNameChange}
      />
      <h2>Filtrer par</h2>
      <h3>Prix</h3>
      <div>
        <p>De</p>&nbsp;
        <input
          type="number"
          placeholder="Min €"
          value={minPrice ?? ""}
          onChange={minPriceChange}
        />
        &nbsp;
        <p>€ à</p>&nbsp;
        <input
          type="number"
          placeholder="Max €"
          value={maxPrice ?? ""}
          onChange={maxPriceChange}
        />
        &nbsp;
        <p>€</p>
      </div>
      <button type="button">Croissant</button>
      <button type="button">Décroissant</button>
      <hr />
      <h3>Catégories</h3>
      <select value={category ?? ""} onChange={categoryChange}>
        <option value="">-----------------</option>
        <option value="1">Figurines</option>
        <option value="2">Objets pratiques</option>
        <option value="3">Jeux</option>
      </select>
    </>
  );
}

export default ProductsFilter;
