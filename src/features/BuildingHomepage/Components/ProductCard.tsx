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
    <article className="build-home-product-card">
      <div className="build-home-product-image">
        {images ? <img src={images} alt={name} /> : <span>No Image</span>}
      </div>

      <strong title={name}>{name}</strong>
      <small>Rs {mrp ?? "-"}</small>

      <button onClick={onAdd}>Add</button>
    </article>
  );
};

export default ProductCard;
