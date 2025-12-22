import React, { useState } from "react";
import { Category } from "../../../shared/types/types";
import CategoryCard from "../Component/CategoryCard";
import CategoryModal from "../Component/CategoryModal";
import "./CategoryPage.css";

interface Props {
  parent: Category;
  onBack: () => void;
}

const ChildCategoryPage: React.FC<Props> = ({ parent, onBack }) => {
  const [open, setOpen] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);

  const categories: Category[] = [
    {
      id: "CAT-03",
      name: "Flour",
      parentCategory: parent.name,
      status: "Active",
      image:
        "https://img.freepik.com/free-photo/dried-food-products-sold-market_181624-60209.jpg",
    },
    {
      id: "CAT-04",
      name: "Salt",
      parentCategory: parent.name,
      status: "Inactive",
      image:
        "https://img.freepik.com/free-photo/dried-food-products-sold-market_181624-60209.jpg",
    },
  ];

  const openAdd = () => {
    setEditCat({
      id: "",
      name: "",
      parentCategory: parent.name,
      status: "Active",
    });
    setOpen(true);
  };

  return (
    <div className="category-page">
      <div className="page-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBack}>←</button>
          <h2>{parent.name} / Categories</h2>
        </div>

        <button className="primary-btn" onClick={openAdd}>
          + Add Category
        </button>
      </div>

      <div className="category-grid">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onEdit={() => {
              setEditCat(cat);
              setOpen(true);
            }}
          />
        ))}
      </div>

      {open && (
        <CategoryModal
          category={editCat}
          parentOptions={[parent]}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default ChildCategoryPage;
