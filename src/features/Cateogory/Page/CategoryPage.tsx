import React, { useState } from "react";
import { Category } from "../../../shared/types/types";
import CategoryCard from "../Component/CategoryCard";
import CategoryModal from "../Component/CategoryModal";
import "./CategoryPage.css";

import {
  useEditChildCategoryMutation,
  useEditParentCategoryMutation,
  useGetChildCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/services/productsApi";
import CustomAlert from "@/assets/UI/CustomAlert/CustomAlert";

type CategoryMode = "parentCategory" | "childCategory";

const CategoriesPage: React.FC = () => {
  const [view, setView] = useState<"parent" | "child">("parent");
  const [activeParent, setActiveParent] = useState<Category | null>(null);
  const [modalType, setModalType] = useState<CategoryMode>("parentCategory");
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    variant: "success" | "error" | "warning" | "info";
  } | null>(null);

  const { data: parentResponse } = useGetProductsQuery();

  const { data: childResponse } = useGetChildCategoriesQuery(
    activeParent?._id!,
    {
      skip: !activeParent,
    },
  );

  const [editParentCategory] = useEditParentCategoryMutation();
  const [editChildCategory] = useEditChildCategoryMutation();

  const parentCategories = (parentResponse as any)?.data?.categories ?? [];
  const childCategories = (childResponse as any)?.data?.categories ?? [];

  const openAddParent = () => {
    setEditCategory(null);
    setModalType("parentCategory");
    setModalOpen(true);
  };

  const openAddChild = () => {
    if (!activeParent) return;

    setEditCategory(null);
    setModalType("childCategory");
    setModalOpen(true);
  };

  const handleParentClick = (parent: Category) => {
    setActiveParent(parent);
    setView("child");
  };

  const handleToggleStatus = async (category: Category) => {
    const nextStatus = !category.isActive;
    const formData = new FormData();

    formData.append("id", category._id);
    formData.append("name", category.name);
    formData.append("isActive", String(nextStatus));

    try {
      if (view === "parent") {
        await editParentCategory(formData).unwrap();
      } else {
        await editChildCategory(formData).unwrap();
      }

      setAlertInfo({
        title: nextStatus ? "Category Enabled" : "Category Disabled",
        message: `${category.name} is now ${nextStatus ? "active" : "inactive"}.`,
        variant: "success",
      });
    } catch (error) {
      console.error("Category status update failed", error);
      setAlertInfo({
        title: "Status Update Failed",
        message: "Something went wrong while updating the category status.",
        variant: "error",
      });
    }
  };

  const listToRender = view === "parent" ? parentCategories : childCategories;

  return (
    <div className="category-page">
      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <div className="category-page-header">
        <div className="category-header-left">
          {view === "child" && (
            <button
              className="category-back-btn"
              onClick={() => {
                setView("parent");
                setActiveParent(null);
              }}
            >
              Back
            </button>
          )}

          <div>
            <span>Catalog Management</span>
            <h2>
              {view === "parent" ? "Parent Categories" : activeParent?.name}
            </h2>
            <p>
              {view === "parent"
                ? "Manage top-level categories and control their visibility."
                : "Manage child categories under this parent category."}
            </p>
          </div>
        </div>

        <button
          className="add-category-btn"
          onClick={view === "parent" ? openAddParent : openAddChild}
        >
          <span className="plus">+</span>
          <span>
            {view === "parent" ? "Add Parent Category" : "Add Category"}
          </span>
        </button>
      </div>

      <div className="category-grid">
        {listToRender.map((cat: Category) => (
          <CategoryCard
            key={cat._id}
            category={cat}
            mode={view}
            onOpen={() => {
              if (view === "parent") {
                handleParentClick(cat);
              } else {
                setEditCategory(cat);
                setModalType("childCategory");
                setModalOpen(true);
              }
            }}
            onEdit={() => {
              setEditCategory(cat);
              setModalType(view === "child" ? "childCategory" : "parentCategory");
              setModalOpen(true);
            }}
            onToggle={() => handleToggleStatus(cat)}
          />
        ))}
      </div>

      {listToRender.length === 0 && (
        <div className="category-empty-state">
          No categories found. Add one to start building the catalog.
        </div>
      )}

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
