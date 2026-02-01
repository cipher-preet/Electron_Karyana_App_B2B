import "../Components/PreviewSection.css";

export type Product = {
  id: string;
  name: string;
  price: string;
};

type PreviewSectionProps = {
  title: string;
  products: Product[];
};

const PreviewSection = ({ title, products }: PreviewSectionProps) => {
  return (
    <div className="preview-section">
      <h3>{title}</h3>

      <div className="preview-grid">
        {products.map((p) => (
          <div key={p.id} className="preview_card">
            <strong className="product-name">{p.name}</strong>
            <small className="product-price">₹{p.price}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewSection;
