import "./ProductPicker.css";
import ProductCard from "./ProductCard";

const products = [
  { name: "iPhone 15", price: "79,999" },
  { name: "Samsung TV", price: "45,999" },
  { name: "Smart Watch", price: "9,999" },
  { name: "Laptop", price: "65,999" },
  { name: "Laptop", price: "65,999" },
];

const ProductPicker = () => {
  return (
    <section className="hp-card">
      <h2>Electronics → Select Products (Max 6)</h2>
      <div className="hp-grid">
        {products.map((p) => (
          <ProductCard key={p.name} {...p} />
        ))}
      </div>
    </section>
  );
};

export default ProductPicker;
