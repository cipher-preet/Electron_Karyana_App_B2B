import React, { useState } from "react";
import { Category, CategoryApiResponse } from "../../../shared/types/types";
import CategoryCard from "../Component/CategoryCard";
import CategoryModal from "../Component/CategoryModal";
import "./CategoryPage.css";
import { useGetProductsQuery } from "@/redux/services/productsApi";

interface Props {
  onOpenParent: (parent: Category) => void;
}

type parentCategories ={
  sucess : true,
  data : CategoryApiResponse
}

type categoryMode = "parentCategory" | "childCategory"

const CategoriesPage: React.FC<Props> = ({ onOpenParent }) => {
  const [view, setView] = useState<"parent" | "child">("parent");
  const [activeParent, setActiveParent] = useState<Category | null>(null);
  const [modalType,setModalType] = useState<categoryMode>("parentCategory")
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const {data : response} = useGetProductsQuery<parentCategories>();
  // console.log(response,"99999999999999")
  // const categories = response?.data?.categories ?? []

  // const categories: Category[] = [
  //   {
  //     _id: "CAT-01",
  //     name: "Staples",
  //     images:
  //       "https://img.freepik.com/free-photo/dried-food-products-sold-market_181624-60209.jpg?semt=ais_hybrid&w=740&q=80",
  //     status: "Active",
  //   },
  //   {
  //     _id: "CAT-02",
  //     name: "Beverages",
  //     images:
  //       "https://img.freepik.com/free-photo/dried-food-products-sold-market_181624-60209.jpg?semt=ais_hybrid&w=740&q=80",
  //     status: "Active",
  //   },
  //   {
  //     _id: "CAT-03",
  //     name: "Flour",
  //     images:
  //       "https://img.freepik.com/free-photo/dried-food-products-sold-market_181624-60209.jpg?semt=ais_hybrid&w=740&q=80",
  //     parentCategory: "Staples",
  //     status: "Active",
  //   },
  //   {
  //     _id: "CAT-04",
  //     name: "Salt",
  //     images:
  //       "https://img.freepik.com/free-photo/dried-food-products-sold-market_181624-60209.jpg?semt=ais_hybrid&w=740&q=80",
  //     parentCategory: "Staples",
  //     status: "Inactive",
  //   },
  // ];

  // const parentCategories = response.categories.filter((c : Category) => !c.parentCategory);
  // const childCategories = response.data.categories.filter(
  //   (c : Category) => c.parentCategory === activeParent?.name
  // );

  const openAddParent = ({}) => {
    setEditCategory(null);
    setModalOpen(true);
    setModalType("parentCategory")
  };

  const openAddChild = () => {
    if (!activeParent) return;
    

    setEditCategory({
      _id: "",
      name: "",
      parentCategory: activeParent.name,
      isActive : true ,
    });
    setModalType("childCategory")
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
        {response?.data.categories.map((cat: Category) => (
          <CategoryCard
            key={cat._id}
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
          parentOptions={response?.data?.categories}
          onClose={() => setModalOpen(false)}
          formName={modalType}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
