import "../Components/PreviewSection.css";

export type Product = {
   _id: string;
  name: string;
  mrp: number;
  images?:string
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
          <div key={p._id} className="preview_card">
            <strong className="product-name">{p.name}</strong>
            <small className="product-price">₹{p.mrp}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewSection;
