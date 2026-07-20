import React, { useEffect, useState } from "react";
import "./ProductInfoPage.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddproductimagesAndhighlightsMutation,
  useGetproductimagesandhighlightsQuery,
} from "@/redux/services/productsApi";
import CustomAlert from "@/assets/UI/CustomAlert/CustomAlert";

interface ImageItem {
  preview: string;
  key?: string;
  file?: File;
  isExisting?: boolean;
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

  return `${safeName || "product-image"}-${Date.now()}${extension}`;
};

const normalizeImageFile = (file: File) => {
  return new File([file], sanitizeImageFileName(file.name), {
    type: file.type,
    lastModified: file.lastModified,
  });
};

const ProductInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetproductimagesandhighlightsQuery(id);

  const [addProductDetailAndImages, { isLoading: adding }] =
    useAddproductimagesAndhighlightsMutation();

  const [highlights, setHighlights] = useState<any[]>([]);
  const [extraImages, setExtraImages] = useState<ImageItem[]>([]);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    variant: "success" | "error" | "warning" | "info";
  } | null>(null);

  const addHighlight = () => {
    setHighlights([...highlights, { heading: "", description: "" }]);
  };

  useEffect(() => {
    if (data?.data?.data) {
      const apiData = data.data.data;

      setHighlights(apiData.heighlights || []);

      const formattedImages: ImageItem[] = (apiData.images || []).map(
        (key: string, index: number) => ({
          key,
          preview: apiData.url[index],
          isExisting: true,
        }),
      );

      setExtraImages(formattedImages);
    }
  }, [data]);

  const removeHighlight = (index: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  const handleHighlightChange = (
    index: number,
    field: "heading" | "description",
    value: string,
  ) => {
    const updated = [...highlights];
    updated[index][field] = value;
    setHighlights(updated);
  };

  const removeImage = (index: number) => {
    setExtraImages((prev) => {
      const imageToRemove = prev[index];

      if (imageToRemove?.file && imageToRemove.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("productId", id || "");
      formData.append("heighlights", JSON.stringify(highlights));

      const existingImages = extraImages
        .filter((img) => img.isExisting)
        .map((img) => img.key);

      formData.append("existingImages", JSON.stringify(existingImages));

      extraImages.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file);
        }
      });

      await addProductDetailAndImages(formData).unwrap();
      setAlertInfo({
        title: "Product Info Saved",
        message: "The product images and highlights have been saved successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      setAlertInfo({
        title: "Save Failed",
        message: "Something went wrong while saving product information.",
        variant: "error",
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    const newImages: ImageItem[] = files.map((file) => {
      const normalizedFile = normalizeImageFile(file);

      return {
        preview: URL.createObjectURL(normalizedFile),
        file: normalizedFile,
      };
    });

    setExtraImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  if (isLoading) return <div className="product-info-loading">Loading...</div>;

  return (
    <div className="product-info-container">
      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <div className="product-info-header">
        <div>
          <span>Product Setup</span>
          <h2>Product Extra Information</h2>
          <p>
            Manage gallery images and highlight content shown on product detail
            pages.
          </p>
        </div>

        <button
          className="product-info-back-btn"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>

      <section className="product-info-section">
        <div className="product-info-section-header">
          <div>
            <h3>Product Gallery</h3>
            <p>Add clear images that help buyers inspect this item.</p>
          </div>
          <span>{extraImages.length} images</span>
        </div>

        <div className="product-upload-frame">
          <label>
            <strong>Upload Product Images</strong>
            <p>PNG, JPG or WEBP. Filenames are cleaned automatically.</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <div className="product-image-preview-grid">
          {extraImages.length === 0 && (
            <div className="product-empty-state">No images added yet.</div>
          )}

          {extraImages.map((img, index) => (
            <div key={`${img.preview}-${index}`} className="product-image-wrapper">
              <img src={img.preview} alt="Product preview" />
              <button
                onClick={() => removeImage(index)}
                aria-label="Remove image"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="product-info-section">
        <div className="product-info-section-header">
          <div>
            <h3>Product Highlights</h3>
            <p>Add concise benefit points for the product detail page.</p>
          </div>
          <button className="product-add-highlight-btn" onClick={addHighlight}>
            + Add Highlight
          </button>
        </div>

        <div className="product-highlights-list">
          {highlights.length === 0 && (
            <div className="product-empty-state">No highlights added yet.</div>
          )}

          {highlights.map((item, index) => (
            <div key={index} className="product-highlight-row">
              <div className="product-highlight-index">{index + 1}</div>
              <input
                type="text"
                placeholder="Heading"
                value={item.heading}
                onChange={(e) =>
                  handleHighlightChange(index, "heading", e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleHighlightChange(index, "description", e.target.value)
                }
              />

              <button onClick={() => removeHighlight(index)}>Remove</button>
            </div>
          ))}
        </div>
      </section>

      <div className="product-info-actions">
        <button
          className="product-info-save-btn"
          onClick={handleSubmit}
          disabled={adding}
        >
          {adding ? "Saving..." : "Save Product Info"}
        </button>
      </div>
    </div>
  );
};

export default ProductInfoPage;
