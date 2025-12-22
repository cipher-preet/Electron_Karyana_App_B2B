import React, { useState } from "react";
import { Category } from "../../../shared/types/types";
import CategoriesPage from "../Page/CategoryPage";
import ChildCategoryPage from "./ChildCategoryPage";

const CategoriesContainer: React.FC = () => {
  const [activeParent, setActiveParent] = useState<Category | null>(null);

  if (activeParent) {
    return (
      <ChildCategoryPage
        parent={activeParent}
        onBack={() => setActiveParent(null)}
      />
    );
  }

  return (
    <CategoriesPage
      onOpenParent={(parent) => setActiveParent(parent)}
    />
  );
};

export default CategoriesContainer;
