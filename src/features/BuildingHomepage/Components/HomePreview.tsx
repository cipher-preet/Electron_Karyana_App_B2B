import "./HomePreview.css";
import PreviewSection from "./PreviewSection";

type HomePreviewProps = {
  sections: {
    categoryId: string;
    categoryName: string;
    products: any[];
  }[];
  onRemoveProduct: (categoryId: string, productId: string) => void;
  onBuildHome: () => void;
  isLoading: boolean;
};

const HomePreview = ({
  sections,
  onRemoveProduct,
  onBuildHome,
  isLoading,
}: HomePreviewProps) => {
  return (
    <>
      <h2>Homepage Preview</h2>
      {sections.map((section) => (
        <PreviewSection
          key={section.categoryId}
          categoryId={section.categoryId}
          title={section.categoryName}
          products={section.products}
          onRemoveProduct={onRemoveProduct}
        />
      ))}

      <div className="footer_home">
        <button
          className="button-43"
          role="button"
          onClick={onBuildHome}
          disabled={isLoading || sections.length === 0}
        >
          Build Home
        </button>
      </div>
    </>
  );
};

export default HomePreview;
