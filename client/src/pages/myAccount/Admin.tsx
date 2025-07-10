import { useState } from "react";
import { Trash } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import AddProduct from "../../components/product/adminManagement/addProduct/Addproduct";
import ModifyProduct from "../../components/product/adminManagement/modifyProduct/ModifyProduct";
import { useProductSearch } from "../../contexts/ProductSearchContext";
import type { ProductType } from "../../types/product";

function Admin() {
  const { productName, suggestions, fetchSuggestions } = useProductSearch();
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    fetchSuggestions(value);
  };

  const fetchProductDetails = (id: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedProduct(data);
        setShowDeleteModal(false);
      })
      .catch((err) => console.error(err));
  };

  const searchBar = {
    productName,
    suggestions,
    productNameChange: onSearchInputChange,
  };

  const newProduct: ProductType = {
    id: -1,
    name: "",
    description: "",
    price: 0,
    category_id: 0,
    images: [],
  };

  const deleteProduct = (id: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/product/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Produit supprimé !");
        setSelectedProduct(null);
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <h1>Admin</h1>
      <h2>ModifyOrDeleteProduct</h2>
      <ModifyProduct
        searchBar={searchBar}
        productDetails={selectedProduct || newProduct}
        onFetchProductDetails={fetchProductDetails}
        onSubmit={(formData, productId) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/product/${productId}`, {
            method: "PUT",
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                toast.error("Erreur lors de la modification du produit");
                throw new Error("Erreur lors de la modification du produit");
              }
              return response.json();
            })
            .then(() => {
              toast.success("Produit modifié !");
              setSelectedProduct(null);
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      />

      {selectedProduct && (
        <button
          type="button"
          className="btn btn-danger my-3"
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash />
        </button>
      )}
      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
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
                  <strong>{selectedProduct?.name}</strong> ?
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
                    selectedProduct && deleteProduct(selectedProduct.id);
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2>Ajouter un produit</h2>
      <AddProduct
        productDetails={newProduct}
        onSubmit={(formData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                toast.error(`Erreur lors de la création d'un produit`);
                throw new Error("Erreur lors de la création du produit");
              }
              return response.json();
            })
            .then(() => {
              toast.success("Produit créé !");
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      />
    </>
  );
}
export default Admin;
