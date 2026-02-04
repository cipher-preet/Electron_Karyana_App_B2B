import "../Components/PreviewSection.css";

export type Product = {
  _id: string;
  name: string;
  mrp: number;
  images?: string;
};

type PreviewSectionProps = {
  categoryId: string;
  title: string;
  products: Product[];
  onRemoveProduct: (categoryId: string, productId: string) => void;
};

const PreviewSection = ({
  categoryId,
  title,
  products,
  onRemoveProduct,
}: PreviewSectionProps) => {
  return (
    <div className="preview-section">
      <h3>{title}</h3>

      <div className="preview-grid">
        {products.map((p) => (
          <div key={p._id} className="preview_card">
            <button
              className="delete-btn"
              onClick={() => onRemoveProduct(categoryId, p._id)}
            >
              ✕
            </button>

            <img className="img" src={p.images} alt={p.name} />
            <strong className="product-name">{p.name}</strong>
            <small className="product-price">₹{p.mrp}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewSection;
