import React, { useState } from "react";
import "./ProductInfoPage.css";

const ProductInfoPage = () => {
  const [highlights, setHighlights] = useState([
    { heading: "Brand", description: "Nestle" },
    { heading: "Weight", description: "500g" },
    { heading: "Type", description: "Organic Coffee" },
  ]);

  const [extraImages, setExtraImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1580910051074-3eb694886505",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
  ]);

  const addHighlight = () => {
    setHighlights([...highlights, { heading: "", description: "" }]);
  };

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
    setExtraImages((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = () => {
    console.log({
      highlights,
      extraImages,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    const newImageUrls = files.map((file) => URL.createObjectURL(file));

    setExtraImages((prev) => [...prev, ...newImageUrls]);
  };

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
              <img src={img} alt="preview" />
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

      <button className="save-btn" onClick={handleSubmit}>
        Save Product Info
      </button>
    </div>
  );
};

export default ProductInfoPage;
