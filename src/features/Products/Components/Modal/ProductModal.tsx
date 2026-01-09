import React, { useState } from "react";
import {
  useCreateProductMutation,
  useGetUnitsQuery,
  useGetBrandsQuery,
  useGetParentCategoriesForFormsQuery,
  useGetChildCategoriesForFormsQuery,
} from "@/redux/services/productsApi";

import SearchableDropdown from "../../../../assets/UI/SearchableDropdown";
import "./ProductModal.css";

const ProductModal = ({ onClose }) => {
  const [createProduct, { isLoading }] = useCreateProductMutation();

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

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  // BASE API CALLS
  const units = useGetUnitsQuery()?.data?.data ?? [];
  const brands = useGetBrandsQuery()?.data?.data ?? [];
  const parentCategories =
    useGetParentCategoriesForFormsQuery()?.data?.data ?? [];

  // ⭐ FIXED: CHILD CATEGORY QUERY — ALWAYS PASS OBJECT
  const { data: childApiData,isFetching: isChildLoading, } = useGetChildCategoriesForFormsQuery( form?.categoryId ,{ skip: !form.categoryId });

  console.log("UNITS",units)

  const childCategories = childApiData?.data ?? [];

  // IMAGE HANDLING
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImage = (file) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // SUBMIT HANDLER
  const handleSubmit = async () => {
    if (!imageFile) return alert("Image required");

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("images", imageFile);

    await createProduct(fd).unwrap();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal modern">
        {/* HEADER */}
        <div className="modal-header">
          <h3>Add Product</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="image-upload">
          <label>
            {imagePreview ? (
              <img src={imagePreview} alt="preview" />
            ) : (
              <span>Upload Product Image</span>
            )}
            <input
              type="file"
              hidden
              onChange={(e) => handleImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* FORM FIELDS */}
        <div className="modal-grid">
          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />

          <input
            placeholder="SKU"
            value={form.sku}
            onChange={(e) => update("sku", e.target.value)}
          />

          {/* BRAND */}
          <SearchableDropdown
            label="Select Brand"
            items={brands}
            displayKey="name"
            valueKey="_id"
            selected={form.brandId}
            onSelect={(v) => update("brandId", v?._id)}
          />

          {/* PARENT CATEGORY */}
          <SearchableDropdown
            label="Select Category"
            items={parentCategories}
            displayKey="name"
            valueKey="_id"
            selected={form.categoryId}
            onSelect={(v) => {
              update("categoryId", v?._id);
              update("subcategoryId", ""); // Reset subcategory
            }}
          />

          {/* SUBCATEGORY */}
          <SearchableDropdown
            label={
              !form.categoryId
                ? "Select Parent Category First"
                : isChildLoading
                ? "Loading Subcategories..."
                : "Select Subcategory"
            }
            items={childCategories}
            displayKey="name"
            valueKey="_id"
            selected={form.subcategoryId}
            onSelect={(v) => update("subcategoryId", v?._id)}
            disabled={!form.categoryId || isChildLoading}
          />

          {/* PRICES */}
          <input
            placeholder="MRP"
            value={form.mrp}
            onChange={(e) => update("mrp", e.target.value)}
          />

          <input
            placeholder="Market Price"
            value={form.marketPrice}
            onChange={(e) => update("marketPrice", e.target.value)}
          />

          <input
            placeholder="Selling Price"
            value={form.sellingPrice}
            onChange={(e) => update("sellingPrice", e.target.value)}
          />

          {/* UNIT */}
          <SearchableDropdown
                label="Select Unit"
                items={units}
                displayKey="name"         
                valueKey="name"           
                selected={form.unit}      
                onSelect={(item) => update("unit", item?.name)}
              />



          <input
            placeholder="Quantity Per Unit"
            value={form.quantityPerUnit}
            onChange={(e) => update("quantityPerUnit", e.target.value)}
          />

          <input
            placeholder="Off Percentage"
            value={form.offPercentage}
            onChange={(e) => update("offPercentage", e.target.value)}
          />

          <input
            placeholder="Tag"
            value={form.tag}
            onChange={(e) => update("tag", e.target.value)}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="modal-actions">
          <button disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? "Saving..." : "Save Product"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
