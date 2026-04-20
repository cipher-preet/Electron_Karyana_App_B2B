import React, { useEffect, useState } from "react";
import {
  useCreateProductMutation,
  useGetUnitsQuery,
  useGetBrandsQuery,
  useGetParentCategoriesForFormsQuery,
  useGetChildCategoriesForFormsQuery,
  useEditProductCategoryMutation,
} from "@/redux/services/productsApi";

import SearchableDropdown from "../../../../assets/UI/SearchableDropdown";
import "./ProductModal.css";
import ConfirmAlert from "@/assets/UI/ConfirmAlert/ConfirmAlert";
import { useGetallTagsForDashboardQuery } from "@/redux/services/UnitBrandApi";

interface ModalProps {
  product?: any;
  onClose: (success?: boolean) => void;
}

/* ✅ MOVE OUTSIDE (IMPORTANT) */
const InputField = ({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (e: any) => void;
  label: string;
}) => {
  return (
    <div className="form-group">
      <input
        placeholder=" "
        value={value || ""}
        onChange={onChange}
      />
      <label>{label}</label>
    </div>
  );
};

const ProductModal: React.FC<ModalProps> = ({ product, onClose }) => {
  const [createProduct] = useCreateProductMutation();
  const [editProduct] = useEditProductCategoryMutation();

  const isEdit = Boolean(product?._id);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    categoryId: "",
    subcategoryId: "",
    brandId: "",
    mrp: "",
    marketPrice: "",
    sellingPrice: "",
    unit: "",
    quantityPerUnit: "",
    offPercentage: "",
    tag: "",
  });

  /* ✅ SIMPLE UPDATE (NO CALLBACK) */
  const update = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  /* ✅ FIXED: ONLY RUN WHEN PRODUCT ID CHANGES */
  useEffect(() => {
    if (product?._id) {
      setForm({
        name: product.name ?? "",
        sku: String(product.sku ?? ""),
        categoryId:
          typeof product.categoryId === "object"
            ? product.categoryId._id
            : product.categoryId ?? "",
        subcategoryId:
          typeof product.subcategoryId === "object"
            ? product.subcategoryId._id
            : product.subcategoryId ?? "",
        brandId:
          typeof product.brandId === "object"
            ? product.brandId._id
            : product.brandId ?? "",
        mrp: String(product.mrp ?? ""),
        marketPrice: String(product.marketPrice ?? ""),
        sellingPrice: String(product.sellingPrice ?? ""),
        unit:
          typeof product.unit === "object"
            ? product.unit.name
            : product.unit ?? "",
        quantityPerUnit: String(product.quantityPerUnit ?? ""),
        offPercentage: String(product.offPercentage ?? ""),
        tag: product.tag ?? "",
      });

      setPreview(product.image ? [product.image] : []);
    } else {
      /* ✅ RESET ONLY ON ADD */
      setForm({
        name: "",
        sku: "",
        categoryId: "",
        subcategoryId: "",
        brandId: "",
        mrp: "",
        marketPrice: "",
        sellingPrice: "",
        unit: "",
        quantityPerUnit: "",
        offPercentage: "",
        tag: "",
      });

      setPreview([]);
    }
  }, [product?._id]);

  const unitsRes: any = useGetUnitsQuery();
  const brandsRes: any = useGetBrandsQuery();
  const parentRes: any = useGetParentCategoriesForFormsQuery();
  const tagRes: any = useGetallTagsForDashboardQuery();

  const units = unitsRes?.data?.data || [];
  const brands = brandsRes?.data?.data || [];
  const tags = tagRes?.data?.data || [];
  const parentCategories = parentRes?.data?.data || [];

  const childRes: any = useGetChildCategoriesForFormsQuery(form.categoryId, {
    skip: !form.categoryId,
  });

  const childCategories = childRes?.data?.data || [];

  const handleImage = (file: File) => {
    setNewImages([file]);
    setPreview([URL.createObjectURL(file)]);
    setExistingImages([]);
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const openConfirm = () => setShowConfirm(true);

  const handleConfirmSave = async () => {
    setShowConfirm(false);

    const fd = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      fd.append(key, value);
    });

    newImages.forEach((img) => fd.append("images", img));
    existingImages.forEach((path) => fd.append("existingImages[]", path));

    try {
      if (isEdit) {
        fd.append("productId", product!._id);
        await editProduct(fd).unwrap();
        alert("Product updated successfully!");
        onClose(true);
        return;
      }

      if (newImages.length === 0) {
        alert("Please upload a product image.");
        return;
      }

      await createProduct(fd).unwrap();
      alert("Product created successfully!");
      onClose(true);
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {showConfirm && (
        <ConfirmAlert
          title={isEdit ? "Update Product" : "Create Product"}
          message={
            isEdit
              ? "Are you sure you want to update this product?"
              : "Are you sure you want to create this product?"
          }
          confirmText={isEdit ? "Update" : "Create"}
          cancelText="Cancel"
          onConfirm={handleConfirmSave}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <div className="product-modal-overlay">
        <div className="product-modal">

          {/* HEADER */}
          <div className="modal-header">
            <h3>{isEdit ? "Edit Product" : "Add Product"}</h3>
            <button onClick={() => onClose(false)}>✕</button>
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* IMAGE */}
            <div className="image-upload">
              <label>
                {preview.length > 0 ? (
                  <img src={preview[0]} alt="preview" />
                ) : (
                  <span>Upload Product Image</span>
                )}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) handleImage(e.target.files[0]);
                  }}
                />
              </label>
            </div>

            {/* FORM */}
            <div className="modal-grid">
              <InputField
                label="Product Name"
                value={form.name}
                onChange={(e: any) => update("name", e.target.value)}
              />
              <InputField
                label="SKU"
                value={form.sku}
                onChange={(e: any) => update("sku", e.target.value)}
              />

              <SearchableDropdown
                label="Select Brand"
                items={brands}
                displayKey="name"
                valueKey="_id"
                selected={form.brandId}
                onSelect={(v) => update("brandId", v?._id)}
              />

              <SearchableDropdown
                label="Select Category"
                items={parentCategories}
                displayKey="name"
                valueKey="_id"
                selected={form.categoryId}
                onSelect={(v) => {
                  update("categoryId", v?._id);
                  update("subcategoryId", "");
                }}
              />

              <SearchableDropdown
                label="Select Subcategory"
                items={childCategories}
                displayKey="name"
                valueKey="_id"
                selected={form.subcategoryId}
                onSelect={(v) => update("subcategoryId", v?._id)}
                disabled={!form.categoryId}
              />

              <InputField
                label="MRP"
                value={form.mrp}
                onChange={(e: any) => update("mrp", e.target.value)}
              />
              <InputField
                label="Market Price"
                value={form.marketPrice}
                onChange={(e: any) => update("marketPrice", e.target.value)}
              />
              <InputField
                label="Selling Price"
                value={form.sellingPrice}
                onChange={(e: any) => update("sellingPrice", e.target.value)}
              />

              <SearchableDropdown
                label="Select Unit"
                items={units}
                displayKey="name"
                valueKey="name"
                selected={form.unit}
                onSelect={(item) => update("unit", item?.name)}
              />

              <InputField
                label="Quantity Per Unit"
                value={form.quantityPerUnit}
                onChange={(e: any) => update("quantityPerUnit", e.target.value)}
              />
              <InputField
                label="Off Percentage"
                value={form.offPercentage}
                onChange={(e: any) => update("offPercentage", e.target.value)}
              />

              <SearchableDropdown
                label="Select Tags"
                items={tags}
                displayKey="name"
                valueKey="name"
                selected={form.tag}
                onSelect={(item) => update("tag", item?.name)}
              />
            </div>

          </div>

          {/* ACTIONS */}
          <div className="modal-actions">
            <button className="add-btns" onClick={openConfirm}>
              {isEdit ? "Update Product" : "Save Product"}
            </button>

            <button className="add-btns" onClick={() => onClose(false)}>
              Cancel
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductModal;