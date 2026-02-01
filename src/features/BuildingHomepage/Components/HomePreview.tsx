
import PreviewSection from "./PreviewSection";

type Product = {
  id: string;
  name: string;
  price: string;
};

type PreviewSectionType = {
  categoryId: string;
  categoryName: string;
  products: Product[];
};

type HomePreviewProps = {
  sections: PreviewSectionType[];
};

const HomePreview = ({ sections }: HomePreviewProps) => {
  return (
    <section className="hp-card">
      <h2>Homepage Preview</h2>

      {sections.map((s) => (
        <PreviewSection
          key={s.categoryId}
          title={s.categoryName}
          products={s.products}
        />
      ))}
    </section>
  );
};

export default HomePreview;
