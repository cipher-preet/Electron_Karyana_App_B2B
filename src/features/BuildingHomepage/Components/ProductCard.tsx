import "./ProductCard.css";

export type Product = {
  _id: string;
  name: string;
  mrp: number;
  images?: string;
};

type ProductCardProps = Product & {
  onAdd: () => void;
};

const ProductCard = ({ name, mrp, images, onAdd }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="img" />

      {/* <image src={images}></image> */}

      <strong className="product-name">{name}</strong>
      <small className="product-price">₹{mrp}</small>

      <button className="add-btn" onClick={onAdd}>
        Add
      </button>
    </div>
  );
};

export default ProductCard;
