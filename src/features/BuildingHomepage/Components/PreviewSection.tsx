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
    <section className="build-home-preview-section">
      <div className="build-home-preview-section-header">
        <h3>{title}</h3>
        <span>{products.length}/6 products</span>
      </div>

      <div className="build-home-preview-grid">
        {products.map((p) => (
          <article key={p._id} className="build-home-preview-card">
            <button
              className="build-home-delete-btn"
              onClick={() => onRemoveProduct(categoryId, p._id)}
              aria-label="Remove product"
            >
              X
            </button>

            <div className="build-home-preview-image">
              {p.images ? <img src={p.images} alt={p.name} /> : <span>No Image</span>}
            </div>
            <strong title={p.name}>{p.name}</strong>
            <small>Rs {p.mrp ?? "-"}</small>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PreviewSection;
