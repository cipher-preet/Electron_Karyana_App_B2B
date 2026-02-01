import "./BuildingHomePage.css";
import { useState } from "react";

import HomePageBuilderHeader from "../Components/HomePageBuilderHeader";
import CategoryPicker from "../Components/CategoryPicker";
import ProductPicker from "../Components/ProductPicker";
import HomePreview from "../Components/HomePreview";

export type Product = {
  id: string;
  name: string;
  price: string;
};

export type PreviewSectionType = {
  categoryId: string;
  categoryName: string;
  products: Product[];
};

const BuildingHomePage = () => {
  const [activeCategory, setActiveCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [previewSections, setPreviewSections] = useState<PreviewSectionType[]>(
    [],
  );

  const handleCategoryAdd = (id: string, name: string) => {
    setActiveCategory({ id, name });
  };

  const handleProductAdd = (product: Product) => {
    if (!activeCategory) return;

    setPreviewSections((prev) => {
      const section = prev.find((s) => s.categoryId === activeCategory.id);

      if (section) {
        return prev.map((s) =>
          s.categoryId === activeCategory.id
            ? {
                ...s,
                products: [...s.products, product].slice(0, 6),
              }
            : s,
        );
      }

      return [
        ...prev,
        {
          categoryId: activeCategory.id,
          categoryName: activeCategory.name,
          products: [product],
        },
      ];
    });
  };

  return (
    <div className="hp-layout">
      <HomePageBuilderHeader />

      <CategoryPicker onCategoryAdd={handleCategoryAdd} />

      {activeCategory && (
        <ProductPicker
          categoryId={activeCategory.id}
          categoryName={activeCategory.name}
          onProductAdd={handleProductAdd}
        />
      )}

      <HomePreview sections={previewSections} />
    </div>
  );
};

export default BuildingHomePage;
