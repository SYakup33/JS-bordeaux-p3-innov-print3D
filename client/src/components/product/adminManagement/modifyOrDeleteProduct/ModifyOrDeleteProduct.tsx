import { useEffect, useRef, useState } from "react";
import { useProductSearch } from "../../../../contexts/ProductSearchContext";
import type { ModifyProductProps } from "../../../../types/product";
import "./ModifyOrDeleteProduct.css";
import { Floppy, Trash } from "react-bootstrap-icons";

function ModifyOrDeleteProduct({
  searchBar,
  productDetails,
  onFetchProductDetails,
  onSubmit,
  onDelete,
}: ModifyProductProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState<number>(
    productDetails?.category_id || 1,
  );

  const [showProduct, setShowProduct] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [previewImages, setPreviewImages] = useState<Record<number, string>>(
    {},
  );

  const imageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imageId: number,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImages((prev) => ({ ...prev, [imageId]: previewUrl }));
    }
  };

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
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    onSubmit(formData, productDetails.id);
    formRef.current?.reset();
  };

  return (
    <>
      <input
        className="product-filter-search w-50 ms-2 mt-1 mb-3 border border-2 border-black"
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
              className="product-filter-li border-bottom border-1 border-black ms-3 p-2 w-75 text-black"
              onClick={() => {
                onFetchProductDetails(item.id);
                setSuggestions([]);
                setProductName("");
                setShowProduct(true);
              }}
              onKeyDown={() => {
                onFetchProductDetails(item.id);
                setSuggestions([]);
                setProductName("");
                setShowProduct(true);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      {productDetails && showProduct && (
        <form
          ref={formRef}
          onSubmit={(e) => {
            modifyProduct(e);
            setShowProduct(false);
          }}
          className="d-flex"
        >
          <div className="ps-2 w-25 ">
            {productDetails.images?.map((image) => (
              <div
                key={image.id}
                className="d-flex justify-content-center align-items-center mb-3"
              >
                <label
                  htmlFor={`image-${image.id}`}
                  className="mb-2 cursor-pointer"
                >
                  <img
                    src={
                      previewImages[image.id]
                        ? previewImages[image.id]
                        : `${import.meta.env.VITE_API_URL}${image.path}`
                    }
                    alt={`Produit ${productDetails.name}`}
                    className="img-fluid modify-delete-product-images"
                  />
                </label>
                <input type="hidden" name="imageIds[]" value={image.id} />
                <input
                  type="file"
                  id={`image-${image.id}`}
                  name={`image-${image.id}`}
                  className="d-none"
                  onChange={(e) => imageChange(e, image.id)}
                />
              </div>
            ))}
          </div>

          <div className="ps-1 w-50 ms-2">
            <div className="d-flex flex-column fw-bold mt-2">
              <label htmlFor="name">Nom</label>
              <input
                className="w-100 mt-1 border border-black border-2"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column fw-bold mt-2">
              <label htmlFor="">Prix</label>
              <input
                className="w-50 mt-1 border border-black border-2"
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="d-flex flex-column fw-bold mt-2">
              <label htmlFor="description">Description</label>
              <textarea
                className="w-100 mt-1 border border-black border-2"
                rows={5}
                cols={40}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column fw-bold mt-2">
              <label htmlFor="category">Catégorie</label>
              <button
                className="modify-delete-product-btn btn dropdown-toggle mt-1 border-1 border-black"
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
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center flex-column ms-3 me-1">
            <div className="w-25 mb-4 ms-md-auto d-flex align-items-center flex-column">
              <Floppy
                size={25}
                onClick={() => formRef.current?.requestSubmit()}
                className="modify-delete-product-icon"
              />
              <p className="fw-bold">Sauvegarder</p>
            </div>
            <div className="w-25 d-flex ms-md-auto align-items-center flex-column">
              <Trash
                size={25}
                onClick={() => setShowDeleteModal(true)}
                className="modify-delete-product-icon"
              />
              <p className="fw-bold">Supprimer</p>
            </div>

            {showDeleteModal && (
              <div
                className="modal fade show d-block"
                tabIndex={-1}
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Confirmation</h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setShowDeleteModal(false)}
                      />
                    </div>
                    <div className="modal-body">
                      <p>
                        Es-tu sûr de vouloir supprimer le produit{" "}
                        <strong>{productDetails.name}</strong> ?
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowDeleteModal(false)}
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          onDelete(productDetails.id);
                          setShowDeleteModal(false);
                          setShowProduct(false);
                        }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      )}
    </>
  );
}

export default ModifyOrDeleteProduct;
