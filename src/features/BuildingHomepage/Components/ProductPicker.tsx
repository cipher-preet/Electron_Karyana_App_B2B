import ProductCard from "./ProductCard";

export type Product = {
  id: string;
  name: string;
  price: string;
};

type ProductPickerProps = {
  categoryId: string;
  categoryName: string;
  onProductAdd: (product: Product) => void;
};

const ProductPicker = ({
  categoryName,
  onProductAdd,
}: ProductPickerProps) => {
  
  const products: Product[] = [
    { id: "1", name: "iPhone 15", price: "79,999" },
    { id: "2", name: "Samsung TV", price: "45,999" },
  ];

  return (
    <section className="hp-card">
      <h2>{categoryName} → Select Products (Max 6)</h2>

      <div className="hp-grid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            {...p}
            onAdd={() => onProductAdd(p)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductPicker;
