import { useRef, useState } from "react";
import type { AddProductProps } from "../../../../types/product";
import "./AddProduct.css";
import { PlusSquare } from "react-bootstrap-icons";

function AddProduct({ productDetails, onSubmit }: AddProductProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState(productDetails.category_id);

  return (
    <>
      <h3>Mon formulaire d'ajout de produit</h3>
      <form
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          formData.append("category_id", String(category));

          onSubmit(formData);
          formRef.current?.reset();
          setCategory(1);
        }}
      >
        <input type="text" name="name" defaultValue={productDetails.name} />
        <textarea
          rows={5}
          cols={40}
          name="description"
          defaultValue={productDetails.description}
        />
        <input
          type="number"
          name="price"
          defaultValue={productDetails.price}
          step="any"
        />
        <button
          className="product-filter-dropdown btn dropdown-toggle w-100 border-black"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
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
              className="dropdown-item"
              type="button"
              onClick={() => setCategory(1)}
            >
              Figurines
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => setCategory(2)}
            >
              Objets pratiques
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => setCategory(3)}
            >
              Jeux
            </button>
          </li>
        </ul>
        <input type="file" name="images" />
        <input type="file" name="images" />
        <input type="file" name="images" />
        <button type="submit">
          <PlusSquare />
        </button>
      </form>
    </>
  );
}

export default AddProduct;
