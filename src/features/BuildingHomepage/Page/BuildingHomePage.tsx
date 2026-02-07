import "./BuildingHomePage.css";
import { useEffect, useState } from "react";

import HomePageBuilderHeader from "../Components/HomePageBuilderHeader";
import CategoryPicker from "../Components/CategoryPicker";
import ProductPicker from "../Components/ProductPicker";
import HomePreview from "../Components/HomePreview";

import {
  useCreateHomePageMutation,
  useGetHomePageDetailsForDashboardQuery,
} from "@/redux/services/BuidHomeApi";

/* ---------------- TYPES ---------------- */

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
  const { data: homePageDetails, isLoading: isHomePageDetailsLoading } =
    useGetHomePageDetailsForDashboardQuery();

  const [createHomePage, { isLoading }] = useCreateHomePageMutation();

  const [activeCategory, setActiveCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [previewSections, setPreviewSections] = useState<PreviewSectionType[]>(
    [],
  );

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (!homePageDetails?.data || isHydrated) return;

    const formatted: PreviewSectionType[] = homePageDetails.data.map(
      (section: any) => ({
        categoryId: section.categoryId,
        categoryName: section.categoryName,
        products: section.products,
      }),
    );

    setPreviewSections(formatted);
    setIsHydrated(true);
  }, [homePageDetails, isHydrated]);

  const handleCategoryAdd = (id: string, name: string) => {
    setActiveCategory({ id, name });
  };

  const handleProductAdd = (product: Product) => {
    if (!activeCategory) return;

    setPreviewSections((prev) => {
      const existingSection = prev.find(
        (s) => s.categoryId === activeCategory.id,
      );

      if (existingSection) {
        const alreadyExists = existingSection.products.some(
          (p) => p._id === product._id,
        );

        if (alreadyExists) return prev;

        return prev.map((section) =>
          section.categoryId === activeCategory.id
            ? {
                ...section,
                products: [...section.products, product].slice(0, 6),
              }
            : section,
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

  const handleBuildHome = async () => {
    try {
      const payload = {
        homepageDetails: previewSections.map((section) => ({
          categoryId: section.categoryId,
          categoryName: section.categoryName,
          products: section.products.map((p) => p._id),
        })),
      };

      await createHomePage(payload).unwrap();

      alert("Homepage built successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to build homepage");
    }
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
        isLoading={isLoading || isHomePageDetailsLoading}
      />
    </div>
  );
};

export default BuildingHomePage;
