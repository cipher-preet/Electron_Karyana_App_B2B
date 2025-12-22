import React, { useState } from "react";
import { Product } from "../../../shared/types/types";
import ProductCard from "../Components/card/ProductCard";
import ProductModal from "../Components/Modal/ProductModal";
import "./ProductPage.css";

const ProductPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

 const products: Product[] =
  [
  {
    id: "SKU-101",
    name: "Aashirvaad Atta 5kg",
    brand: "ITC",
    category: "Staples",
    subCategory: "Flour",
    barcode: "8901725123456",
    price: 385,              
    sellingPrice: 360,     
    gst: 5,
    unit: "5 kg",
    minOrderQty: 1,
    stock: 120,
    reorderLevel: 30,
    status: "Active",
    description: "Premium quality whole wheat atta for daily use.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa4jhxPx0jlBil2Zsn7BYcMv0GOnyg2wjbBA&s",
  },
  {
    id: "SKU-102",
    name: "Tata Salt 1kg",
    brand: "Tata",
    category: "Staples",
    subCategory: "Salt",
    barcode: "8901058001234",
    price: 30,
    sellingPrice: 28,
    gst: 0,
    unit: "1 kg",
    minOrderQty: 5,
    stock: 0,
    reorderLevel: 50,
    status: "Inactive",
    description: "Iodized salt for everyday cooking.",
    image: "https://www.tataconsumer.com/sites/g/files/gfwrlq316/files/Tata%20salt%2B%20vitamin%20shakti.png",
  },
  {
    id: "SKU-102",
    name: "Tata Salt 1kg",
    brand: "Tata",
    category: "Staples",
    subCategory: "Salt",
    barcode: "8901058001234",
    price: 30,
    sellingPrice: 28,
    gst: 0,
    unit: "1 kg",
    minOrderQty: 5,
    stock: 0,
    reorderLevel: 50,
    status: "Inactive",
    description: "Iodized salt for everyday cooking.",
    image: "https://www.tataconsumer.com/sites/g/files/gfwrlq316/files/Tata%20salt%2B%20vitamin%20shakti.png",
  },
  {
    id: "SKU-102",
    name: "Tata Salt 1kg",
    brand: "Tata",
    category: "Staples",
    subCategory: "Salt",
    barcode: "8901058001234",
    price: 30,
    sellingPrice: 28,
    gst: 0,
    unit: "1 kg",
    minOrderQty: 5,
    stock: 0,
    reorderLevel: 50,
    status: "Inactive",
    description: "Iodized salt for everyday cooking.",
    image: "https://www.tataconsumer.com/sites/g/files/gfwrlq316/files/Tata%20salt%2B%20vitamin%20shakti.png",
  },
  {
    id: "SKU-119",
    name: "Patanjali",
    brand: "Patanjali",
    category: "Personal Care",
    subCategory: "Oral Care",
    barcode: "8904109456789",
    price: 50,
    sellingPrice: 48,
    gst: 12,
    unit: "100 g",
    minOrderQty: 12,
    stock: 180,
    reorderLevel: 60,
    status: "Active",
    description: "Herbal toothpaste for complete oral health.",
    image: "https://www.patanjaliayurved.net/assets/product_images/400x500/1748241013cholesterolcare1.webp"
  },
]


  const handleAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelected(product);
    setOpen(true);
  };

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
          <ProductCard key={p.id} product={p} onEdit={handleEdit} />
        ))}
      </div>

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
