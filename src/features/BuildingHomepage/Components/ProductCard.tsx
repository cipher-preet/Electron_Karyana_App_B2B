import "./ProductCard.css";

export type Product = {
  id: string;
  name: string;
  price: string;
};

type ProductCardProps = Product & {
  onAdd: () => void;
};

const ProductCard = ({ name, price, onAdd }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="img" />

      <strong className="product-name">{name}</strong>
      <small className="product-price">₹{price}</small>

      <button className="add-btn" onClick={onAdd}>
        Add
      </button>
    </div>
  );
};

export default ProductCard;
