import type React from "react";
import { useRef, useState } from "react";
import type { AddProductProps } from "../../../../types/product";
import "./AddProduct.css";
import { Download, PlusCircle } from "react-bootstrap-icons";

function AddProduct({ productDetails, onSubmit }: AddProductProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState(productDetails.category_id);
  const [files, setFiles] = useState<(File | undefined)[]>([
    undefined,
    undefined,
    undefined,
  ]);

  const handleOnChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const newFiles = [...files];
      newFiles[index] = target.files ? target.files[0] : undefined;
      setFiles(newFiles);
    };

  return (
    <>
      <form
        className="d-flex mb-5"
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          formData.append("category_id", String(category));

          onSubmit(formData).then((result) => {
            if (result?.success) {
              formRef.current?.reset();
              setFiles([undefined, undefined, undefined]);
              setCategory(1);
            }
          });
        }}
      >
        <div className="w-25 ps-1">
          <div className="upload-column d-flex flex-column justify-content-center align-items-center gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="d-flex flex-column align-items-center">
                <input
                  id={`file-${i}`}
                  type="file"
                  name="images"
                  className="d-none"
                  onChange={handleOnChange(i)}
                />
                <label htmlFor={`file-${i}`}>
                  <Download className="add-product-icon mb-3" size={50} />
                </label>
                {files[i] && <p>{files[i]?.name}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="ps-1 w-50 ms-2">
          <div className="d-flex flex-column fw-bold mt-3">
            <label htmlFor="name">Nom</label>
            <input
              className="border border-black border-2"
              type="text"
              name="name"
              defaultValue={productDetails.name}
            />
          </div>
          <div className="d-flex flex-column fw-bold mt-3">
            <label htmlFor="price">Prix</label>
            <input
              className="border border-black border-2"
              type="number"
              name="price"
              defaultValue={productDetails.price}
              step="any"
            />
          </div>
          <div className="d-flex flex-column fw-bold mt-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="border border-black border-2"
              rows={5}
              cols={40}
              name="description"
              defaultValue={productDetails.description}
            />
          </div>
          <div className="d-flex flex-column fw-bold mt-3">
            <label htmlFor="category">Catégorie</label>
            <button
              className="add-product-btn btn dropdown-toggle mt-1 border-1 border-black"
              type="button"
              data-bs-toggle="dropdown"
            >
              {category === 1
                ? "Figurines"
                : category === 2
                  ? "Objets pratiques"
                  : category === 3
                    ? "Jeux"
                    : "Catégorie"}
            </button>
            <ul className="dropdown-menu w-25">
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
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column w-25">
          <PlusCircle
            size={30}
            onClick={() => formRef.current?.requestSubmit()}
            className="add-product-icon"
          />
          <p className="fw-bold">Ajouter</p>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
