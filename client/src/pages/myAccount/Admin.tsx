import { toast } from "react-toastify";
import AddProduct from "../../components/product/adminManagement/addProduct/Addproduct";
import ModifyOrDeleteProduct from "../../components/product/adminManagement/modifyOrDeleteProduct/ModifyOrDeleteProduct";
import { useProductSearch } from "../../contexts/ProductSearchContext";

function Admin() {
  const { productName, suggestions, fetchSuggestions } = useProductSearch();
  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    fetchSuggestions(value);
  };

  const searchBar = {
    productName,
    suggestions,
    productNameChange: onSearchInputChange,
  };

  const newProduct = {
    name: "",
    description: "",
    price: 0,
    category_id: 0,
  };

  return (
    <>
      <h1>Admin</h1>
      <h2>ModifyOrDeleteProduct</h2>
      <ModifyOrDeleteProduct searchBar={searchBar} />
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
            .then((data) => {
              toast.success("Produit créé :", data);
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
