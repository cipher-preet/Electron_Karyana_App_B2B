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
import { Product } from "@/shared/types/types";

interface ModalProps {
  product?: Product | null;
  onClose: (success?: boolean) => void;
}

const ProductModal: React.FC<ModalProps> = ({ product, onClose }) => {
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [editProduct, { isLoading: isUpdating }] = useEditProductCategoryMutation();

  const isEditMode = Boolean(product?._id);

  const [form, setForm] = useState({
  name: product?.name ?? "",
  sku: product?.sku ?? "",

  // Extract IDs safely (backend may return object or string)
  categoryId: typeof product?.categoryId === "object" 
    ? product?.categoryId?._id 
    : product?.categoryId ?? "",

  subcategoryId: typeof product?.subcategoryId === "object" 
    ? product?.subcategoryId?._id 
    : product?.subcategoryId ?? "",

  brandId: typeof product?.brandId === "object"
    ? product?.brandId?._id
    : product?.brandId ?? "",

  // numeric fields
  mrp: product?.mrp ?? "",
  marketPrice: product?.marketPrice ?? "",
  sellingPrice: product?.sellingPrice ?? "",

  // unit might come as object!
  unit: typeof product?.unit === "object"
    ? product?.unit?.name
    : product?.unit ?? "",

  quantityPerUnit: product?.quantityPerUnit ?? "",
  offPercentage: product?.offPercentage ?? "",
  tag: product?.tag ?? "",
});


  const update = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // BASE API
  const units = useGetUnitsQuery()?.data?.data ?? [];
  const brands = useGetBrandsQuery()?.data?.data ?? [];
  const parentCategories = useGetParentCategoriesForFormsQuery()?.data?.data ?? [];

  const {
    data: childApiData,
    isFetching: isChildLoading,
  } = useGetChildCategoriesForFormsQuery(form.categoryId, {
    skip: !form.categoryId,
  });

  const childCategories = childApiData?.data ?? [];

  // IMAGE HANDLING
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImage = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Load existing image on edit
  useEffect(() => {
    if (product?.images?.[0]) {
      setImagePreview(product.images[0]);
    }
  }, [product]);

  // SUBMIT HANDLER
  const handleSubmit = async () => {
    const fd = new FormData();

    // add form fields
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));

    // add image if uploaded
    if (imageFile) {
      fd.append("images", imageFile);
    }

    if (isEditMode) {
      // API expects these:
      fd.append("productId", product!._id);

      // required by API
      if (product?.images?.length) {
        fd.append("existingImages", product.images[0]); // sending only first image
      }

      await editProduct(fd).unwrap();
      onClose(true);
    } else {
      if (!imageFile) return alert("Image required");

      await createProduct(fd).unwrap();
      onClose(true);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal modern">
        {/* HEADER */}
        <div className="modal-header">
          <h3>{isEditMode ? "Edit Product" : "Add Product"}</h3>
          <button onClick={() => onClose(false)}>✕</button>
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
              onChange={(e) => e.target.files && handleImage(e.target.files[0])}
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

        {/* BUTTONS */}
        <div className="modal-actions">
          <button
            disabled={isCreating || isUpdating}
            onClick={handleSubmit}
          >
            {isCreating || isUpdating
              ? "Saving..."
              : isEditMode
              ? "Update Product"
              : "Save Product"}
          </button>

          <button onClick={() => onClose(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;










// import React, { useEffect, useState } from "react";
// import {
//   useCreateProductMutation,
//   useGetUnitsQuery,
//   useGetBrandsQuery,
//   useGetParentCategoriesForFormsQuery,
//   useGetChildCategoriesForFormsQuery,
// } from "@/redux/services/productsApi";

// import SearchableDropdown from "../../../../assets/UI/SearchableDropdown";
// import "./ProductModal.css";

// const ProductModal = ({product , onClose }) => {
//   const [createProduct, { isLoading }] = useCreateProductMutation();

//   const [form, setForm] = useState({
//   name: product?.name || "",
//   sku: product?.sku || "",
//   categoryId: product?.categoryId || "",
//   subcategoryId: product?.subcategoryId || "",
//   brandId: product?.brandId || "",
//   mrp: product?.mrp || "",
//   marketPrice: product?.marketPrice || "",
//   sellingPrice: product?.sellingPrice || "",
//   unit: product?.unit || "",
//   quantityPerUnit: product?.quantityPerUnit || "",
//   offPercentage: product?.offPercentage || "",
//   tag: product?.tag || "",
// });


//   const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

//   // BASE API CALLS
//   const units = useGetUnitsQuery()?.data?.data ?? [];
//   const brands = useGetBrandsQuery()?.data?.data ?? [];
//   const parentCategories =
//     useGetParentCategoriesForFormsQuery()?.data?.data ?? [];

//   // ⭐ FIXED: CHILD CATEGORY QUERY — ALWAYS PASS OBJECT
//   const { data: childApiData,isFetching: isChildLoading, } = useGetChildCategoriesForFormsQuery( form?.categoryId ,{ skip: !form.categoryId });

//   console.log("UNITS",units)

//   const childCategories = childApiData?.data ?? [];

//   // IMAGE HANDLING
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleImage = (file) => {
//     setImageFile(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   // SUBMIT HANDLER
//   const handleSubmit = async () => {
//     if (!imageFile) return alert("Image required");

//     const fd = new FormData();
//     Object.entries(form).forEach(([k, v]) => fd.append(k, v));
//     fd.append("images", imageFile);

//     await createProduct(fd).unwrap();
//     onClose();
//   };

//   useEffect(() => {
//   if (product?.images?.[0]) {
//     setImagePreview(product.images[0]);
//       }
//     }, [product]);


//   return (
//     <div className="modal-overlay">
//       <div className="modal modern">
//         {/* HEADER */}
//         <div className="modal-header">
//           <h3>Add Product</h3>
//           <button onClick={onClose}>✕</button>
//         </div>

//         {/* IMAGE UPLOAD */}
//         <div className="image-upload">
//           <label>
//             {imagePreview ? (
//               <img src={imagePreview} alt="preview" />
//             ) : (
//               <span>Upload Product Image</span>
//             )}
//             <input
//               type="file"
//               hidden
//               onChange={(e) => handleImage(e.target.files[0])}
//             />
//           </label>
//         </div>

//         {/* FORM FIELDS */}
//         <div className="modal-grid">
//           <input
//             placeholder="Product Name"
//             value={form.name}
//             onChange={(e) => update("name", e.target.value)}
//           />

//           <input
//             placeholder="SKU"
//             value={form.sku}
//             onChange={(e) => update("sku", e.target.value)}
//           />

//           {/* BRAND */}
//           <SearchableDropdown
//             label="Select Brand"
//             items={brands}
//             displayKey="name"
//             valueKey="_id"
//             selected={form.brandId}
//             onSelect={(v) => update("brandId", v?._id)}
//           />

//           {/* PARENT CATEGORY */}
//           <SearchableDropdown
//             label="Select Category"
//             items={parentCategories}
//             displayKey="name"
//             valueKey="_id"
//             selected={form.categoryId}
//             onSelect={(v) => {
//               update("categoryId", v?._id);
//               update("subcategoryId", ""); 
//             }}
//           />

//           {/* SUBCATEGORY */}
//           <SearchableDropdown
//             label={
//               !form.categoryId
//                 ? "Select Parent Category First"
//                 : isChildLoading
//                 ? "Loading Subcategories..."
//                 : "Select Subcategory"
//             }
//             items={childCategories}
//             displayKey="name"
//             valueKey="_id"
//             selected={form.subcategoryId}
//             onSelect={(v) => update("subcategoryId", v?._id)}
//             disabled={!form.categoryId || isChildLoading}
//           />

//           {/* PRICES */}
//           <input
//             placeholder="MRP"
//             value={form.mrp}
//             onChange={(e) => update("mrp", e.target.value)}
//           />

//           <input
//             placeholder="Market Price"
//             value={form.marketPrice}
//             onChange={(e) => update("marketPrice", e.target.value)}
//           />

//           <input
//             placeholder="Selling Price"
//             value={form.sellingPrice}
//             onChange={(e) => update("sellingPrice", e.target.value)}
//           />

//           {/* UNIT */}
//           <SearchableDropdown
//                 label="Select Unit"
//                 items={units}
//                 displayKey="name"         
//                 valueKey="name"           
//                 selected={form.unit}      
//                 onSelect={(item) => update("unit", item?.name)}
//               />



//           <input
//             placeholder="Quantity Per Unit"
//             value={form.quantityPerUnit}
//             onChange={(e) => update("quantityPerUnit", e.target.value)}
//           />

//           <input
//             placeholder="Off Percentage"
//             value={form.offPercentage}
//             onChange={(e) => update("offPercentage", e.target.value)}
//           />

//           <input
//             placeholder="Tag"
//             value={form.tag}
//             onChange={(e) => update("tag", e.target.value)}
//           />
//         </div>

//         {/* ACTION BUTTONS */}
//         <div className="modal-actions">
//           <button disabled={isLoading} onClick={handleSubmit}>
//             {isLoading ? "Saving..." : "Save Product"}
//           </button>
//           <button onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;
