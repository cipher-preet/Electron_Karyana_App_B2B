
import PreviewSection from "./PreviewSection";

export type Product = {
   _id: string;
  name: string;
  mrp: number;
  images?:string
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
