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
  }, [data]);

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

  return (
    <div className="product-selector">
      <h3>Select Products</h3>

      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="product-list">
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => addProduct(product)}
          >
            <div>
              <h4>{product.name}</h4>
              <p>₹ {product.mrp}</p>
            </div>

            <button>Add</button>
          </div>
        ))}
      </div>

      {data?.data?.nextCursor && (
        <button
          className="load-more-btn"
          onClick={loadMore}
          disabled={isFetching}
        >
          {isFetching ? "Loading..." : "Load More"}
        </button>
      )}

      {isLoading && <p>Loading products...</p>}
    </div>
  );
};

export default ProductSelector;
