import React, { useState } from "react";
import "./SetTrendPage.css";
import TrendForm from "./TrendForm";
import ProductSelector from "./ProductSelector";
import SelectedProductsPanel from "./SelectedProductsPanel";

const SetTrendPage = () => {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const addProduct = (product: any) => {
    if (!selectedProducts.find((p) => p._id === product._id)) {
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  const removeProduct = (id: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="trend-container">
      <div className="trend-left">
        <TrendForm selectedProducts={selectedProducts} />
        <ProductSelector addProduct={addProduct} />
      </div>

      <div className="trend-right">
        <SelectedProductsPanel
          products={selectedProducts}
          removeProduct={removeProduct}
        />
      </div>
    </div>
  );
};

export default SetTrendPage;
