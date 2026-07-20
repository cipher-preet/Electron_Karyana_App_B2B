import React, { useEffect, useState } from "react";
import "./ProductModal.css";
import {
  useCreateProductMutation,
  useGetUnitsQuery,
  useGetBrandsQuery,
  useGetParentCategoriesForFormsQuery,
  useGetChildCategoriesForFormsQuery,
  useEditProductCategoryMutation,
} from "@/redux/services/productsApi";

import SearchableDropdown from "../../../../assets/UI/SearchableDropdown";
import ConfirmAlert from "@/assets/UI/ConfirmAlert/ConfirmAlert";
import CustomAlert from "@/assets/UI/CustomAlert/CustomAlert";
import { useGetallTagsForDashboardQuery } from "@/redux/services/UnitBrandApi";

interface ModalProps {
  product?: any;
  onClose: (success?: boolean) => void;
}

const InputField = ({
  value,
  onChange,
  label,
  type = "text",
  readOnly = false,
}: {
  value: string;
  onChange: (e: any) => void;
  label: string;
  type?: string;
  readOnly?: boolean;
}) => {
  return (
    <div className="form-group">
      <input
        placeholder=" "
        type={type}
        value={value || ""}
        onChange={onChange}
        readOnly={readOnly}
      />
      <label>{label}</label>
    </div>
  );
};

const DropdownField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="dropdown-field">
      <label>{label}</label>
      {children}
    </div>
  );
};

const sanitizeImageFileName = (fileName: string) => {
  const lastDot = fileName.lastIndexOf(".");
  const rawName = lastDot > 0 ? fileName.slice(0, lastDot) : fileName;
  const extension = lastDot > 0 ? fileName.slice(lastDot).toLowerCase() : "";
  const safeName = rawName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${safeName || "product-image"}-${Date.now()}${extension}`;
};

const normalizeImageFile = (file: File) => {
  return new File([file], sanitizeImageFileName(file.name), {
    type: file.type,
    lastModified: file.lastModified,
  });
};

const ProductModal: React.FC<ModalProps> = ({ product, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    variant: "success" | "error" | "warning" | "info";
    closeOnDismiss?: boolean;
  } | null>(null);

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

  const update = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  useEffect(() => {
    if (product?._id) {
      setForm({
        name: product.name ?? "",
        sku: String(product.sku ?? ""),
        categoryId:
          typeof product.categoryId === "object"
            ? product.categoryId._id
            : (product.categoryId ?? ""),
        subcategoryId:
          typeof product.subcategoryId === "object"
            ? product.subcategoryId._id
            : (product.subcategoryId ?? ""),
        brandId:
          typeof product.brandId === "object"
            ? product.brandId._id
            : (product.brandId ?? ""),
        mrp: String(product.mrp ?? ""),
        marketPrice: String(product.marketPrice ?? ""),
        sellingPrice: String(product.sellingPrice ?? ""),
        unit:
          typeof product.unit === "object"
            ? product.unit.name
            : (product.unit ?? ""),
        quantityPerUnit: String(product.quantityPerUnit ?? ""),
        offPercentage: String(product.offPercentage ?? ""),
        tag: product.tag ?? "",
      });

      setPreview(product.image ? [product.image] : []);
      setExistingImages(product.images ? [product.images[0]] : []);
    } else {
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

  const priceSummary = {
    mrp: parseFloat(form.mrp) || 0,
    sellingPrice: parseFloat(form.sellingPrice) || 0,
    discount: parseFloat(form.offPercentage) || 0,
  };

  const handleImage = (file: File) => {
    const normalizedFile = normalizeImageFile(file);
    setNewImages([normalizedFile]);
    setPreview([URL.createObjectURL(normalizedFile)]);
    setExistingImages([]);
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const openConfirm = () => setShowConfirm(true);

  const closeAlert = () => {
    const shouldClose = alertInfo?.closeOnDismiss;
    setAlertInfo(null);

    if (shouldClose) {
      onClose(true);
    }
  };

  const handleConfirmSave = async () => {
    setShowConfirm(false);
    setLoading(true);

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
        setAlertInfo({
          title: "Product Updated",
          message: "The product details have been updated successfully.",
          variant: "success",
          closeOnDismiss: true,
        });
        return;
      }

      if (newImages.length === 0) {
        setAlertInfo({
          title: "Image Required",
          message: "Please upload a product image before saving this product.",
          variant: "warning",
        });
        return;
      }

      await createProduct(fd).unwrap();
      setAlertInfo({
        title: "Product Created",
        message: "The new product has been created successfully.",
        variant: "success",
        closeOnDismiss: true,
      });
    } catch (err) {
      console.log(err);
      setAlertInfo({
        title: "Action Failed",
        message: "Something went wrong. Please review the product details and try again.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const mrp = parseFloat(form.mrp);
    const sp = parseFloat(form.sellingPrice);

    if (mrp && sp && mrp > 0) {
      const off = (((mrp - sp) / mrp) * 100).toFixed(2);
      setForm((prev) => ({
        ...prev,
        offPercentage: off,
      }));
    }
  }, [form.mrp, form.sellingPrice]);

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

      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
          onClose={closeAlert}
        />
      )}

      <div className="product-modal-overlay">
        <div className="product-modal">
          <div className="modal-header">
            <div>
              <span className="modal-eyebrow">
                {isEdit ? "Product Management" : "New Inventory Item"}
              </span>
              <h3>{isEdit ? "Edit Product" : "Add Product"}</h3>
            </div>
            <button
              className="modal-close-btn"
              onClick={() => onClose(false)}
              aria-label="Close product modal"
            >
              X
            </button>
          </div>

          <div className="modal-body">
            <div className="product-form-shell">
              <aside className="product-media-panel">
                <div className="image-upload">
                  <label>
                    {preview.length > 0 ? (
                      <img src={preview[0]} alt="Product preview" />
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
                      onChange={(e) => {
                        if (e.target.files) handleImage(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>

                <div className="price-preview">
                  <span>Price Preview</span>
                  <strong>
                    {priceSummary.sellingPrice
                      ? `Rs ${priceSummary.sellingPrice}`
                      : "Set price"}
                  </strong>
                  <p>
                    {priceSummary.mrp
                      ? `MRP Rs ${priceSummary.mrp}`
                      : "Add MRP to calculate discount"}
                  </p>
                  {priceSummary.discount > 0 && (
                    <em>{priceSummary.discount.toFixed(2)}% off</em>
                  )}
                </div>
              </aside>

              <div className="product-fields-panel">
                <section className="form-section">
                  <div className="section-heading">
                    <h4>Product Details</h4>
                    <p>Basic identity and catalog placement.</p>
                  </div>

                  <div className="modal-grid">
                    <InputField
                      label="Product Name"
                      value={form.name}
                      onChange={(e: any) => update("name", e.target.value)}
                    />
                    <InputField
                      label="SKU"
                      type="number"
                      value={form.sku}
                      onChange={(e: any) => update("sku", e.target.value)}
                    />

                    <DropdownField label="Brand">
                      <SearchableDropdown
                        label="Select Brand"
                        items={brands}
                        displayKey="name"
                        valueKey="_id"
                        selected={form.brandId}
                        onSelect={(v) => update("brandId", v?._id)}
                      />
                    </DropdownField>

                    <DropdownField label="Tag">
                      <SearchableDropdown
                        label="Select Tags"
                        items={tags}
                        displayKey="name"
                        valueKey="name"
                        selected={form.tag}
                        onSelect={(item) => update("tag", item?.name)}
                      />
                    </DropdownField>
                  </div>
                </section>

                <section className="form-section">
                  <div className="section-heading">
                    <h4>Category</h4>
                    <p>Choose the shelf where buyers will find this product.</p>
                  </div>

                  <div className="modal-grid">
                    <DropdownField label="Category">
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
                    </DropdownField>

                    <DropdownField label="Subcategory">
                      <SearchableDropdown
                        label="Select Subcategory"
                        items={childCategories}
                        displayKey="name"
                        valueKey="_id"
                        selected={form.subcategoryId}
                        onSelect={(v) => update("subcategoryId", v?._id)}
                        disabled={!form.categoryId}
                      />
                    </DropdownField>
                  </div>
                </section>

                <section className="form-section">
                  <div className="section-heading">
                    <h4>Pricing & Unit</h4>
                    <p>Discount is calculated automatically from MRP and selling price.</p>
                  </div>

                  <div className="modal-grid">
                    <InputField
                      label="MRP"
                      type="number"
                      value={form.mrp}
                      onChange={(e: any) => update("mrp", e.target.value)}
                    />
                    <InputField
                      label="Selling Price"
                      type="number"
                      value={form.sellingPrice}
                      onChange={(e: any) =>
                        update("sellingPrice", e.target.value)
                      }
                    />

                    <DropdownField label="Unit">
                      <SearchableDropdown
                        label="Select Unit"
                        items={units}
                        displayKey="name"
                        valueKey="name"
                        selected={form.unit}
                        onSelect={(item) => update("unit", item?.name)}
                      />
                    </DropdownField>

                    <InputField
                      label="Quantity Per Unit"
                      type="number"
                      value={form.quantityPerUnit}
                      onChange={(e: any) =>
                        update("quantityPerUnit", e.target.value)
                      }
                    />
                    <InputField
                      label="Off Percentage"
                      value={form.offPercentage}
                      onChange={() => {}}
                      readOnly
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button
              className="add-btns"
              onClick={openConfirm}
              disabled={loading}
            >
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Saving..."
                : isEdit
                  ? "Update Product"
                  : "Save Product"}
            </button>

            <button
              className="add-btns"
              onClick={() => onClose(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
