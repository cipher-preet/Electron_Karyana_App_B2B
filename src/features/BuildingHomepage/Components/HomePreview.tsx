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
  const productCount = sections.reduce(
    (total, section) => total + section.products.length,
    0,
  );

  return (
    <aside className="build-home-preview-panel">
      <div className="build-home-preview-header">
        <div>
          <span>Live Preview</span>
          <h2>Homepage Preview</h2>
          <p>{sections.length} sections · {productCount} products selected</p>
        </div>
      </div>

      {sections.length === 0 ? (
        <div className="build-home-preview-empty">
          Add categories and products to create a homepage layout.
        </div>
      ) : (
        sections.map((section) => (
          <PreviewSection
            key={section.categoryId}
            categoryId={section.categoryId}
            title={section.categoryName}
            products={section.products}
            onRemoveProduct={onRemoveProduct}
          />
        ))
      )}

      <div className="build-home-preview-actions">
        <button
          className="build-home-publish-btn"
          onClick={onBuildHome}
          disabled={isLoading || sections.length === 0}
        >
          {isLoading ? "Saving..." : "Build Home"}
        </button>
      </div>
    </aside>
  );
};

export default HomePreview;
