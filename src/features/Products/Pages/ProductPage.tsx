import React, { useState } from "react";
import { Product } from "../../../shared/types/types";
import ProductCard from "../Components/card/ProductCard";
import ProductModal from "../Components/Modal/ProductModal";
import "./ProductPage.css";
import { useGetAllProductsQuery } from "@/redux/services/productsApi";

const ProductPage: React.FC =  () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const [cursor, setCursor] = useState<string | null>(null);

  const { data, isFetching, isLoading } =  useGetAllProductsQuery({
    cursor,
  });
  // console.log("the products details",data?.data?.products)

  const products =   data?.data?.products ?? [];
  const nextCursor = data?.nextCursor;

  const handleAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelected(product);
    setOpen(true);
  };

  const loadMore = () => {
    if (!isFetching && nextCursor) {
      setCursor(nextCursor);
    }
  };

  return (
    <div className="product-page">
      <div className="page-header">
        <h2>Products</h2>
        <button className="add-btn" onClick={handleAdd}>
          + Add Product
        </button>
      </div>

      {/* 🔹 Product Grid */}
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onEdit={handleEdit} />
        ))}
      </div>

      {/* 🔹 Load More */}
      {nextCursor && (
        <div className="load-more">
          <button onClick={loadMore} disabled={isFetching}>
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* 🔹 Empty / Loading states */}
      {isLoading && <p>Loading products...</p>}
      {!isLoading && products.length === 0 && (
        <p>No products found.</p>
      )}

      {/* 🔹 Modal */}
      {open && (
        <ProductModal
          product={selected}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductPage;
