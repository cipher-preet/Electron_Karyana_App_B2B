import "./ProductPage.css";
import React, { useState, useEffect, useCallback } from "react";
import { Product } from "../../../shared/types/types";
import ProductCard from "../Components/card/ProductCard";
import ProductModal from "../Components/Modal/ProductModal";
import { useGetAllProductsQuery } from "@/redux/services/productsApi";
import { useNavigate } from "react-router-dom";

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const [cursor, setCursor] = useState<string | null>(null);

  const { data, isFetching, isLoading, refetch } = useGetAllProductsQuery({
    cursor,
  });

  const products = data?.products ?? [];
  const nextCursor = data?.nextCursor ?? null;

  console.log("this is product images ", products);

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
        <button className="add-btns" onClick={handleAdd}>
          + Add Product
        </button>
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/productInfo/${p._id}`)}
            style={{ cursor: "pointer" }}
          >
            <ProductCard product={p} onEdit={handleEdit} />
          </div>
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
