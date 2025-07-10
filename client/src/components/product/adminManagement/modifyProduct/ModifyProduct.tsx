import { useEffect, useRef, useState } from "react";
import { useProductSearch } from "../../../../contexts/ProductSearchContext";
import type { ModifyProductProps } from "../../../../types/product";
import "./ModifyProduct.css";
import { Floppy } from "react-bootstrap-icons";

function ModifyProduct({
  searchBar,
  productDetails,
  onFetchProductDetails,
  onSubmit,
}: ModifyProductProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState<number>(
    productDetails?.category_id || 1,
  );

  const formRef = useRef<HTMLFormElement>(null);
  const { productName, suggestions, productNameChange } = searchBar;

  const { setSuggestions, setProductName } = useProductSearch();

  useEffect(() => {
    if (productDetails) {
      setName(productDetails.name);
      setDescription(productDetails.description);
      setPrice(productDetails.price);
      setCategory(productDetails.category_id);
    }
  }, [productDetails]);

  const modifyProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productDetails) return;

    const formData = new FormData(e.currentTarget);
    formData.append("category_id", String(category));
    onSubmit(formData, productDetails.id);

    formRef.current?.reset();
  };

  return (
    <>
      <input
        className="product-filter-search w-75 mx-auto mt-1"
        type="text"
        placeholder="Recherche par nom"
        value={productName ?? ""}
        onChange={productNameChange}
      />
      {suggestions.length > 0 && (
        <ul className="d-flex flex-column p-0 align-items-start">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="product-filter-li border-bottom border-1 border-black ms-5 p-2 w-75"
              onKeyDown={() => onFetchProductDetails(item.id)}
              onClick={() => {
                onFetchProductDetails(item.id);
                setSuggestions([]);
                setProductName("");
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      {productDetails && (
        <form ref={formRef} onSubmit={modifyProduct}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            rows={5}
            cols={40}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <button
            className="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            {category === 1
              ? "Figurines"
              : category === 2
                ? "Objets pratiques"
                : category === 3
                  ? "Jeux"
                  : "Figurines"}
          </button>

          <ul className="dropdown-menu">
            <li>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => setCategory(1)}
              >
                Figurines
              </button>
            </li>
            <li>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => setCategory(2)}
              >
                Objets pratiques
              </button>
            </li>
            <li>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => setCategory(3)}
              >
                Jeux
              </button>
            </li>
          </ul>
          {productDetails?.images?.map((imageUrl) => (
            <div key={imageUrl}>
              <img
                src={`${import.meta.env.VITE_API_URL}${imageUrl}`}
                alt={`Produit ${productDetails.name}`}
                width="100"
              />
              <input type="file" name="images" multiple />
            </div>
          ))}
          <button type="submit">
            <Floppy />
          </button>
        </form>
      )}
    </>
  );
}

export default ModifyProduct;
