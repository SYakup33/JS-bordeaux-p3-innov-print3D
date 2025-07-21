import { useEffect, useState } from "react";
// import { useAuth } from "../../../contexts/AuthContext";
import type { ProductType } from "../../../types/product";
import { SliderProducts } from "../SliderProducts";

function TrendProducts() {
  const [trendProducts, setTrendProducts] = useState<ProductType[]>([]);
  // const { token } = useAuth();

  useEffect(() => {
    const fetchTrendProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/moments`,
        );
        const products = await response.json();
        console.log(products);

        setTrendProducts(products || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendProducts();
  }, []);

  // const updateTrendProducts = async (
  //   productId: number,
  //   newTrendProduct: string,
  // ) => {
  //   try {
  //     const res = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/product/${productId}/trend`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({ trendProducts: newTrendProduct }),
  //       },
  //     );

  //     const test = await res.json();
  //     console.log(test);

  //     setTrendProducts((prev) =>
  //       prev.map((p) =>
  //         p.id === productId ? { ...p, trend_products: newTrendProduct } : p,
  //       ),
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <section className="container">
      <SliderProducts
        title="Les produits du moment ..."
        productsList={trendProducts}
      />

      {trendProducts.map((p) => (
        <div key={p.id}>
          <h5>{p.name}</h5>
          <h5>{p.trend_products}</h5>
          <form
            className="mb-5"
            onSubmit={(e) => {
              e.preventDefault();
              // updateTrendProducts(p.id, (e.target as any).value);
            }}
          >
            <label htmlFor="p">Nouvelle</label>
            <input
              type="text"
              name="promotion"
              placeholder="choisir votre trend"
            />
            <button type="submit">Valider</button>
          </form>
        </div>
      ))}
    </section>
  );
}

export default TrendProducts;
