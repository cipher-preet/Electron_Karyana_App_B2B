import React, { useEffect, useState } from "react";
import "./ProductInfoPage.css";
import { useParams } from "react-router-dom";
import {
  useAddproductimagesAndhighlightsMutation,
  useGetproductimagesandhighlightsQuery,
} from "@/redux/services/productsApi";

interface ImageItem {
  preview: string;
  file?: File;
  isExisting?: boolean;
}
const ProductInfoPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } =
    useGetproductimagesandhighlightsQuery(id);

  const [addProductDetailAndImages, { isLoading: adding }] =
    useAddproductimagesAndhighlightsMutation();

  const [highlights, setHighlights] = useState<any[]>([]);

  const [extraImages, setExtraImages] = useState<ImageItem[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const addHighlight = () => {
    setHighlights([...highlights, { heading: "", description: "" }]);
  };

  useEffect(() => {
    if (data?.data?.data) {
      const apiData = data.data.data;
      setHighlights(apiData.heighlights || []);
      const existingImages =
        apiData.images?.map((img: string) => ({
          preview: img,
          isExisting: true,
        })) || [];

      setExtraImages(existingImages);
    }
  }, [data]);

  const removeHighlight = (index: number) => {
    const updated = highlights.filter((_, i) => i !== index);
    setHighlights(updated);
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
    setExtraImages((prev) => prev.filter((_, i) => i !== index));

    setPreviewImages((prev) => {
      const urlToRemove = prev[index];
      if (urlToRemove) {
        URL.revokeObjectURL(urlToRemove);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("productId", id || "");

      formData.append("heighlights", JSON.stringify(highlights));

      extraImages.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file);
        }
      });
      const response = await addProductDetailAndImages(formData).unwrap();
      alert("Product info saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    const newImages: ImageItem[] = files.map((file) => ({
      preview: URL.createObjectURL(file),
      file: file,
    }));

    setExtraImages((prev) => [...prev, ...newImages]);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="product-info-container">
      <h2>Product Extra Information</h2>

      <div className="section">
        <h3>Extra Product Images</h3>
        <div className="upload-frame">
          <label>
            <strong>Click to Upload Images</strong>
            <p>PNG, JPG up to 5MB</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <div className="image-preview-grid">
          {extraImages.map((img, index) => (
            <div key={index} className="image-wrapper">
              <img src={img.preview} alt="preview" />
              <button onClick={() => removeImage(index)}>✕</button>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Product Highlights</h3>

        {highlights.map((item, index) => (
          <div key={index} className="highlight-row">
            <input
              type="text"
              value={item.heading}
              onChange={(e) =>
                handleHighlightChange(index, "heading", e.target.value)
              }
            />

            <input
              type="text"
              value={item.description}
              onChange={(e) =>
                handleHighlightChange(index, "description", e.target.value)
              }
            />

            <button onClick={() => removeHighlight(index)}>Remove</button>
          </div>
        ))}

        <button className="add-btn" onClick={addHighlight}>
          + Add Highlight
        </button>
      </div>

      <button className="save-btn" onClick={handleSubmit} disabled={adding}>
        {adding ? "Saving..." : "Save Product Info"}
      </button>
    </div>
  );
};

export default ProductInfoPage;
