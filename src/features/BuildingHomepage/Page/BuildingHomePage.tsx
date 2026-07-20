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
import CustomAlert from "@/assets/UI/CustomAlert/CustomAlert";

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
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    variant: "success" | "error" | "warning" | "info";
  } | null>(null);

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

      setAlertInfo({
        title: "Homepage Built",
        message: "Homepage sections and products have been saved successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      setAlertInfo({
        title: "Build Failed",
        message: "Something went wrong while saving the homepage layout.",
        variant: "error",
      });
    }
  };

  return (
    <div className="build-home-page">
      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <HomePageBuilderHeader />

      <div className="build-home-workspace">
        <div className="build-home-builder-panel">
          <CategoryPicker
            activeCategoryId={activeCategory?.id ?? null}
            onCategoryAdd={handleCategoryAdd}
          />

          {activeCategory ? (
            <ProductPicker
              categoryId={activeCategory.id}
              categoryName={activeCategory.name}
              onProductAdd={handleProductAdd}
            />
          ) : (
            <section className="build-home-card build-home-empty-guide">
              Select a category to choose homepage products.
            </section>
          )}
        </div>

        <HomePreview
          sections={previewSections}
          onRemoveProduct={handleProductRemove}
          onBuildHome={handleBuildHome}
          isLoading={isLoading || isHomePageDetailsLoading}
        />
      </div>
    </div>
  );
};

export default BuildingHomePage;
