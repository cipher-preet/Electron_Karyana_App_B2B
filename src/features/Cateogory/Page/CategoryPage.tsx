import React, { useState } from "react";
import { Category } from "../../../shared/types/types";
import CategoryCard from "../Component/CategoryCard";
import CategoryModal from "../Component/CategoryModal";
import "./CategoryPage.css";

interface Props {
  onOpenParent: (parent: Category) => void;
}

const CategoriesPage: React.FC<Props> = ({ onOpenParent }) => {
  const [view, setView] = useState<"parent" | "child">("parent");
  const [activeParent, setActiveParent] = useState<Category | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const categories: Category[] = [
    {
      id: "CAT-01",
      name: "Staples",
      image:
        "https://img.freepik.com/free-photo/dried-food-products-sold-market_181624-60209.jpg?semt=ais_hybrid&w=740&q=80",
      status: "Active",
    },
    {
      id: "CAT-02",
      name: "Beverages",
      image:
        "https://img.freepik.com/free-photo/dried-food-products-sold-market_181624-60209.jpg?semt=ais_hybrid&w=740&q=80",
      status: "Active",
    },
    {
      id: "CAT-03",
      name: "Flour",
      image:
        "https://img.freepik.com/free-photo/dried-food-products-sold-market_181624-60209.jpg?semt=ais_hybrid&w=740&q=80",
      parentCategory: "Staples",
      status: "Active",
    },
    {
      id: "CAT-04",
      name: "Salt",
      image:
        "https://img.freepik.com/free-photo/dried-food-products-sold-market_181624-60209.jpg?semt=ais_hybrid&w=740&q=80",
      parentCategory: "Staples",
      status: "Inactive",
    },
  ];

  const parentCategories = categories.filter((c) => !c.parentCategory);
  const childCategories = categories.filter(
    (c) => c.parentCategory === activeParent?.name
  );

  const openAddParent = () => {
    setEditCategory(null);
    setModalOpen(true);
  };

  const openAddChild = () => {
    if (!activeParent) return;

    setEditCategory({
      id: "",
      name: "",
      parentCategory: activeParent.name,
      status: "Active",
    });
    setModalOpen(true);
  };

  return (
    <div className="category-page">
      <div className="page-header">
        <div className="header-left">
          {view === "child" && (
            <button
              className="back-btn"
              onClick={() => {
                setView("parent");
                setActiveParent(null);
              }}
            >
              ←
            </button>
          )}

          <h2>
            {view === "parent" ? "Parent Categories" : activeParent?.name}
          </h2>
        </div>
        <button
          className="add-category-btn"
          onClick={view === "parent" ? openAddParent : openAddChild}
        >
          <span className="plus">＋</span>
          <span>
            {view === "parent" ? "Add Parent Category" : "Add Category"}
          </span>
        </button>
      </div>

      <div className="category-grid">
        {parentCategories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onOpen={() => onOpenParent(cat)}
            onEdit={() => {
              setEditCategory(cat);
              setModalOpen(true);
            }}
          />
        ))}
      </div>

      {modalOpen && (
        <CategoryModal
          category={editCategory}
          parentOptions={parentCategories}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
