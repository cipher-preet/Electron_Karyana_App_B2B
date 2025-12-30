import React, { useState } from "react";
import { Category } from "../../../shared/types/types";
import CategoryCard from "../Component/CategoryCard";
import CategoryModal from "../Component/CategoryModal";
import "./CategoryPage.css";

import {
  useGetChildCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/services/productsApi";

type CategoryMode = "parentCategory" | "childCategory";

const CategoriesPage: React.FC = () => {
  const [view, setView] = useState<"parent" | "child">("parent");
  const [activeParent, setActiveParent] = useState<Category | null>(null);
  const [modalType, setModalType] = useState<CategoryMode>("parentCategory");
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);




  /* ---------------- API CALLS ---------------- */

  const { data: parentResponse } = useGetProductsQuery();

  const { data: childResponse } =
    useGetChildCategoriesQuery(activeParent?._id!, {
      skip: !activeParent,
    });

  const parentCategories =
    parentResponse?.data?.categories ?? [];

  const childCategories =
    childResponse?.data?.categories ?? [];

  /* ---------------- ACTIONS ---------------- */
  console.log("999999999999", childCategories)

  const openAddParent = () => {
    setEditCategory(null);
    setModalType("parentCategory");
    setModalOpen(true);
  };

  const openAddChild = () => {
    if (!activeParent) return;

    // setEditCategory({
    //   _id: "",
    //   name: "",
    //   parentCategory: activeParent._id,
    //   isActive: true,
    // });
    setEditCategory(null)

    setModalType("childCategory");
    setModalOpen(true);
  };

  const handleParentClick = (parent: Category) => {
    setActiveParent(parent);
    setView("child");
  };

  const listToRender =
    view === "parent" ? parentCategories : childCategories;

  return (
    <div className="category-page">
      {/* HEADER */}
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
            {view === "parent"
              ? "Parent Categories"
              : activeParent?.name}
          </h2>
        </div>

        <button
          className="add-category-btn"
          onClick={
            view === "parent"
              ? openAddParent
              : openAddChild
          }
        >
          <span className="plus">＋</span>
          <span>
            {view === "parent"
              ? "Add Parent Category"
              : "Add Category"}
          </span>
        </button>
      </div>

      {/* CATEGORY LIST */}
      <div className="category-grid">
        {listToRender.map((cat) => (
          <CategoryCard
            key={cat._id}
            category={cat}
            onOpen={() => {
              if (view === "parent") {
                // Only parents should open child view
                handleParentClick(cat);
              } else {
                // Child category → open edit modal
                setEditCategory(cat);
                setModalType("childCategory");
                setModalOpen(true);
              }
            }}
            onEdit={() => {
              setEditCategory(cat);

              // ✅ Fix: Use the current 'view' state to determine the mode
              if (view === "child") {
                setModalType("childCategory");
              } else {
                setModalType("parentCategory");
              }

              setModalOpen(true);
            }}
          />

        ))}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <CategoryModal
          category={editCategory}
          parentOptions={parentCategories}
          formName={modalType}
          onClose={() => setModalOpen(false)}
          parentId={activeParent?._id}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
