import React, { useState } from "react";
import { Product, ProductStatus  } from "../../../../shared/types/types";
import "./ProductModal.css";

interface Props {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose }) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    product?.image
  );

  const [form, setForm] = useState<Product>({
    id: product?.id || "",
    name: product?.name || "",
    brand: product?.brand || "",
    category: product?.category || "",
    subCategory: product?.subCategory || "",
    barcode: product?.barcode || "",
    price: product?.price || 0,
    sellingPrice: product?.sellingPrice || 0,
    gst: product?.gst || 0,
    unit: product?.unit || "",
    minOrderQty: product?.minOrderQty || 1,
    stock: product?.stock || 0,
    reorderLevel: product?.reorderLevel || 0,
    status: product?.status || "Active",
    description: product?.description || "",
    image: product?.image,
  });

  const update = <K extends keyof Product>(key: K, value: Product[K]) =>
    setForm({ ...form, [key]: value });

  const onImageChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    update("image", url); // later replace with API URL
  };

  return (
    <div className="modal-overlay">
      <div className="modal modern">
        <div className="modal-header">
          <h3>{product ? "Edit Product" : "Add Product"}</h3>
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
              accept="image/*"
              hidden
              onChange={(e) =>
                e.target.files && onImageChange(e.target.files[0])
              }
            />
          </label>
        </div>

        {/* FORM */}
        <div className="modal-grid">
          <input placeholder="Product Name" value={form.name} onChange={e => update("name", e.target.value)} />
          <input placeholder="Brand" value={form.brand} onChange={e => update("brand", e.target.value)} />
          <input placeholder="SKU" value={form.id} onChange={e => update("id", e.target.value)} />
          <input placeholder="Barcode" value={form.barcode} onChange={e => update("barcode", e.target.value)} />
          <input placeholder="Category" value={form.category} onChange={e => update("category", e.target.value)} />
          <input placeholder="Sub Category" value={form.subCategory} onChange={e => update("subCategory", e.target.value)} />
          <input type="number" placeholder="MRP" value={form.price} onChange={e => update("price", +e.target.value)} />
          <input type="number" placeholder="Selling Price" value={form.sellingPrice} onChange={e => update("sellingPrice", +e.target.value)} />
          <input type="number" placeholder="GST %" value={form.gst} onChange={e => update("gst", +e.target.value)} />
          <input placeholder="Unit" value={form.unit} onChange={e => update("unit", e.target.value)} />
          <input type="number" placeholder="Min Order Qty" value={form.minOrderQty} onChange={e => update("minOrderQty", +e.target.value)} />
          <input type="number" placeholder="Stock" value={form.stock} onChange={e => update("stock", +e.target.value)} />
          <input type="number" placeholder="Reorder Level" value={form.reorderLevel} onChange={e => update("reorderLevel", +e.target.value)} />
          <select value={form.status} onChange={e => update("status", e.target.value as ProductStatus)}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <textarea placeholder="Description" value={form.description} onChange={e => update("description", e.target.value)} />

        <div className="modal-actions">
          <button className="primary">Save Product</button>
          <button className="secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
