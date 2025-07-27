import { useState } from "react";
import { toast } from "react-toastify";
import AddProduct from "../../../components/product/adminManagement/addProduct/Addproduct";
import { useProductSearch } from "../../../contexts/ProductSearchContext";
import type { ProductType } from "../../../types/product";
import "./ProductsManagement.css";
import { ShieldLockFill } from "react-bootstrap-icons";
import ModifyOrDeleteProduct from "../../../components/product/adminManagement/modifyOrDeleteProduct/ModifyOrDeleteProduct";
import { useAuth } from "../../../contexts/AuthContext";

function Admin() {
  const { productName, suggestions, fetchSuggestions } = useProductSearch();
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const { token } = useAuth();
  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    fetchSuggestions(value);
  };

  const fetchProductDetails = (id: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedProduct(data);
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
    trend_product: "",
  };

  const deleteProduct = (id: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/product/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        toast.success("Produit supprimé !");
        setSelectedProduct(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-start p-3 p-md-5 cart-header-title mb-4">
        <h2 className="d-flex align-items-center gap-2 mb-1">
          <ShieldLockFill size={28} />
          Administrateur
        </h2>
      </div>
      <section className="admin-modify-product d-flex flex-column">
        <h2 className="fw-bold ps-2 pt-2">Modifier/Supprimer un produit</h2>
        <ModifyOrDeleteProduct
          searchBar={searchBar}
          productDetails={selectedProduct || newProduct}
          onFetchProductDetails={fetchProductDetails}
          onSubmit={(formData, productId) => {
            fetch(`${import.meta.env.VITE_API_URL}/api/product/${productId}`, {
              method: "PUT",
              headers: { Authorization: `Bearer ${token}` },
              body: formData,
            })
              .then(async (response) => {
                if (!response.ok) {
                  const errorData = await response.json();

                  if (
                    errorData?.validationErrors &&
                    Array.isArray(errorData.validationErrors)
                  ) {
                    for (const err of errorData.validationErrors) {
                      toast.error(err.message);
                    }
                  } else {
                    toast.error("Erreur lors de la modification du produit");
                  }

                  throw new Error("Erreur validation produit");
                }

                return response.json();
              })
              .then(() => {
                toast.success("Produit modifié !");
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          onDelete={(productId) => deleteProduct(productId)}
        />
        <hr className="border border-white border-4 opacity-75" />
        <h2 className="fw-bold">Ajouter un produit</h2>
        <AddProduct
          productDetails={newProduct}
          onSubmit={(formData) => {
            return fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: formData,
            })
              .then(async (response) => {
                if (!response.ok) {
                  const errorData = await response.json();

                  if (
                    errorData?.validationErrors &&
                    Array.isArray(errorData.validationErrors)
                  ) {
                    for (const err of errorData.validationErrors) {
                      toast.error(err.message);
                    }
                  } else {
                    toast.error("Erreur lors de la création du produit");
                  }

                  return { success: false };
                }

                return { success: true };
              })
              .then((result) => {
                if (result.success) {
                  toast.success("Produit créé !");
                }
                return result;
              })
              .catch((err) => {
                console.error(err);
                return { success: false };
              });
          }}
        />
      </section>
    </>
  );
}
export default Admin;
