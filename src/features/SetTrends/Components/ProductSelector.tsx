import React, { useEffect, useState } from "react";
import "./ProductSelector.css";
import { useGetproductsForTrendsQuery } from "@/redux/services/SetTrend";

interface Props {
  addProduct: (product: any) => void;
}

const ProductSelector: React.FC<Props> = ({ addProduct }) => {
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  const { data, isLoading, isFetching } = useGetproductsForTrendsQuery(
    { cursor, search },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (!data?.data) return;

    if (cursor === null) {
      setProducts(data.data.products);
    } else {
      setProducts((prev) => {
        const newProducts = data.data.products.filter(
          (p: any) => !prev.some((prevP) => prevP._id === p._id),
        );
        return [...prev, ...newProducts];
      });
    }
  }, [data, cursor]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCursor(null);
    setProducts([]);
  };

  const loadMore = () => {
    if (data?.data?.nextCursor) {
      setCursor(data.data.nextCursor);
    }
  };

  const getProductImage = (product: any) => {
    if (Array.isArray(product.images)) return product.images[0] ?? "";
    return product.images || "";
  };

  return (
    <section className="trend-product-selector">
      <div className="trend-product-selector-header">
        <div>
          <span>Step 2</span>
          <h3>Select Products</h3>
        </div>
        <strong>{products.length} loaded</strong>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        className="trend-product-search"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="trend-product-list">
        {products.map((product) => (
          <button
            key={product._id}
            type="button"
            className="trend-product-option"
            onClick={() => addProduct(product)}
          >
            <span className="trend-product-option-image">
              {getProductImage(product) ? (
                <img src={getProductImage(product)} alt={product.name} />
              ) : (
                product.name?.charAt(0) || "P"
              )}
            </span>

            <div>
              <h4>{product.name}</h4>
              <p>Rs {product.mrp ?? product.price ?? "-"}</p>
            </div>

            <span className="trend-product-add">Add</span>
          </button>
        ))}
      </div>

      {data?.data?.nextCursor && (
        <button
          className="trend-load-more-btn"
          onClick={loadMore}
          disabled={isFetching}
        >
          {isFetching ? "Loading..." : "Load More"}
        </button>
      )}

      {isLoading && <p className="trend-product-loading">Loading products...</p>}
    </section>
  );
};

export default ProductSelector;
