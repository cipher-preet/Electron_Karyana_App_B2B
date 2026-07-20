import "./CategoryModal.css";
import React, { useState } from "react";
import { Category } from "../../../shared/types/types";
import {
  useCreateChildCategoryMutation,
  useCreateParentCategoryMutation,
  useEditChildCategoryMutation,
  useEditParentCategoryMutation,
} from "@/redux/services/productsApi";
import ConfirmAlert from "@/assets/UI/ConfirmAlert/ConfirmAlert";
import CustomAlert from "@/assets/UI/CustomAlert/CustomAlert";

interface Props {
  category: Category | null;
  parentOptions: Category[];
  onClose: () => void;
  formName?: "parentCategory" | "childCategory";
  parentId?: string;
}

const sanitizeImageFileName = (fileName: string) => {
  const lastDot = fileName.lastIndexOf(".");
  const rawName = lastDot > 0 ? fileName.slice(0, lastDot) : fileName;
  const extension = lastDot > 0 ? fileName.slice(lastDot).toLowerCase() : "";
  const safeName = rawName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${safeName || "category-image"}-${Date.now()}${extension}`;
};

const normalizeImageFile = (file: File) => {
  return new File([file], sanitizeImageFileName(file.name), {
    type: file.type,
    lastModified: file.lastModified,
  });
};

const CategoryModal: React.FC<Props> = ({
  category,
  onClose,
  formName,
  parentId,
}) => {
  const isChild = formName === "childCategory";
  const isEdit = Boolean(category?._id);

  const [name, setName] = useState(category?.name || "");
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    category?.images,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    variant: "success" | "error" | "warning" | "info";
  } | null>(null);

  const [createParentCategory] = useCreateParentCategoryMutation();
  const [createChildCategory] = useCreateChildCategoryMutation();
  const [editParentCategory] = useEditParentCategoryMutation();
  const [editChildCategory] = useEditChildCategoryMutation();

  const modalTitle = isEdit
    ? isChild
      ? "Edit Child Category"
      : "Edit Parent Category"
    : isChild
      ? "Add Child Category"
      : "Add Parent Category";

  const handleSaveClick = () => {
    if (!name.trim()) {
      setAlertInfo({
        title: "Category Name Required",
        message: "Please enter a category name before saving.",
        variant: "warning",
      });
      return;
    }

    setShowConfirm(true);
  };

  const handleImageChange = (file: File) => {
    const normalizedFile = normalizeImageFile(file);
    setImageFile(normalizedFile);
    setImagePreview(URL.createObjectURL(normalizedFile));
  };

  const handleConfirmSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name.trim());

      if (isEdit && category?._id) {
        formData.append("id", category._id);
      }

      if (imageFile) {
        formData.append("images", imageFile);
      }

      if (isChild && !isEdit && parentId) {
        formData.append("parentcategoryId", parentId);
      }

      if (isChild) {
        if (isEdit) {
          await editChildCategory(formData).unwrap();
        } else {
          await createChildCategory(formData).unwrap();
        }
      } else {
        if (isEdit) {
          await editParentCategory(formData).unwrap();
        } else {
          await createParentCategory(formData).unwrap();
        }
      }

      setShowConfirm(false);
      onClose();
    } catch (error) {
      console.error("Category save failed", error);
      setShowConfirm(false);
      setAlertInfo({
        title: "Save Failed",
        message: "Something went wrong while saving the category.",
        variant: "error",
      });
    }
  };

  return (
    <div className="category-modal-overlay">
      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <div className="category-modal">
        <div className="category-modal-header">
          <div>
            <span>{isChild ? "Child Category" : "Parent Category"}</span>
            <h3>{modalTitle}</h3>
          </div>

          <button onClick={onClose} aria-label="Close category modal">
            X
          </button>
        </div>

        <div className="category-modal-body">
          <div className="category-modal-image-upload">
            <label>
              {imagePreview ? (
                <img src={imagePreview} alt="Category preview" />
              ) : (
                <span>
                  <strong>Upload image</strong>
                  <small>PNG, JPG or WEBP</small>
                </span>
              )}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleImageChange(e.target.files[0])
                }
              />
            </label>
          </div>

          <div className="category-modal-field">
            <label>Category Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
        </div>

        <div className="category-modal-actions">
          <button className="category-modal-save-btn" onClick={handleSaveClick}>
            Save
          </button>
          <button className="category-modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmAlert
          title={isEdit ? "Update Category" : "Create Category"}
          message={
            isEdit
              ? `Are you sure you want to update ${name.trim()}?`
              : `Are you sure you want to create ${name.trim()}?`
          }
          confirmText={isEdit ? "Update" : "Create"}
          cancelText="Cancel"
          onConfirm={handleConfirmSave}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default CategoryModal;
