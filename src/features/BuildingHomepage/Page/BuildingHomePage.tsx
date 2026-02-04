import "./BuildingHomePage.css";
import { useState } from "react";

import HomePageBuilderHeader from "../Components/HomePageBuilderHeader";
import CategoryPicker from "../Components/CategoryPicker";
import ProductPicker from "../Components/ProductPicker";
import HomePreview from "../Components/HomePreview";
import { useCreateHomePageMutation } from "@/redux/services/BuidHomeApi";

export type Product = {
  _id: string;
  name: string;
  mrp: number;
  images?: string;
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

  const [createHomePage, { isLoading }] = useCreateHomePageMutation();

  const handleBuildHome = async () => {
    try {
      const payload = {
        homepageDetails: previewSections.map((section) => ({
          categoryId: section.categoryId,
          categoryName: section.categoryName,
          products: section.products.map((p) => p._id),
        })),
      };

      await createHomePage(payload);

      alert("Homepage built successfully");
    } catch (error) {
      console.error("Failed to build home", error);
      alert("Failed to build homepage");
    }
  };

  const handleCategoryAdd = (id: string, name: string) => {
    setActiveCategory({ id, name });
  };

  const handleProductAdd = (product: Product) => {
    if (!activeCategory) return;

    setPreviewSections((prev) => {
      const section = prev.find((s) => s.categoryId === activeCategory.id);

      if (section) {
        const alreadyExists = section.products.some(
          (p) => p._id === product._id,
        );

        if (alreadyExists) return prev;

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

  const handleProductRemove = (categoryId: string, productId: string) => {
    setPreviewSections((prev) =>
      prev
        .map((section) =>
          section.categoryId === categoryId
            ? {
                ...section,
                products: section.products.filter((p) => p._id !== productId),
              }
            : section,
        )
        .filter((section) => section.products.length > 0),
    );
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

      <HomePreview
        sections={previewSections}
        onRemoveProduct={handleProductRemove}
        onBuildHome={handleBuildHome}
        isLoading={isLoading}
      />
    </div>
  );
};

export default BuildingHomePage;
