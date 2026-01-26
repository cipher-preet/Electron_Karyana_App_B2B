import React, { useState, useEffect, useCallback } from "react";
import { Product } from "../../../shared/types/types";
import ProductCard from "../Components/card/ProductCard";
import ProductModal from "../Components/Modal/ProductModal";
import "./ProductPage.css";
import { useGetAllProductsQuery } from "@/redux/services/productsApi";

const ProductPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const [cursor, setCursor] = useState<string | null>(null);

  const { data, isFetching, isLoading, refetch } = useGetAllProductsQuery({
    cursor,
  });

  const products = data?.products ?? [];
  const nextCursor = data?.nextCursor ?? null;
  console.log("++++++++++++++++++++",products)

  useEffect(() => {
    if (!isFetching && data) {
      console.log("New products merged:", data?.products?.length);
    }
  }, [data, isFetching]);

  const handleAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelected(product);
    setOpen(true);
  };

  const loadMore = useCallback(() => {
    if (!isFetching && nextCursor) {
      setCursor(nextCursor);
    }
  }, [isFetching, nextCursor]);

  return (
    <div className="product-page">
      <div className="page-header">
        <h2>Products</h2>
        <button className="add-btn" onClick={handleAdd}>
          + Add Product
        </button>
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onEdit={handleEdit} />
        ))}
      </div>

      {nextCursor && (
        <div className="load-more-container">
          <button
            onClick={loadMore}
            className="load-more-btn"
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {!isLoading && products.length === 0 && (
        <p style={{ textAlign: "center" }}>No products found.</p>
      )}

      {open && (
        <ProductModal
          product={selected}
          onClose={(success: boolean | undefined) => {
            setOpen(false);

            if (success) {
              setCursor(null);
              setTimeout(() => {
                refetch();
              }, 10);
            }
          }}
        />
      )}
    </div>
  );
};

export default ProductPage;
