import { useRef } from "react";
import { MediaItem } from "../../../shared/types/types";

interface Props {
  carousels: MediaItem[];
  setCarousels: React.Dispatch<React.SetStateAction<MediaItem[]>>;
}

const Carousels = ({ carousels, setCarousels }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newItems: MediaItem[] = Array.from(files).map((file) => ({
      type: "new",
      file,
      url: URL.createObjectURL(file),
    }));

    setCarousels((prev) => [...prev, ...newItems]);
  };

  return (
    <section className="bc-panel">
      <div className="bc-upload-zone" onClick={() => inputRef.current?.click()}>
        <span className="bc-upload-icon">+</span>
        <div>
          <h3>Upload carousels</h3>
          <p>Choose carousel images for rotating storefront placements.</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {carousels.length === 0 ? (
        <div className="bc-empty-state">No carousel images uploaded yet.</div>
      ) : (
        <div className="bc-grid">
          {carousels.map((c, i) => (
            <div className="bc-card" key={i}>
              <button
                className="bc-delete-icon"
                aria-label="Delete carousel"
                onClick={() =>
                  setCarousels((prev) => prev.filter((_, idx) => idx !== i))
                }
              >
                x
              </button>
              <img src={c.url} alt={`Carousel ${i + 1}`} />
              <div className="bc-card-footer">
                <span>Carousel {i + 1}</span>
                <small>{c.type === "existing" ? "Saved" : "New"}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Carousels;
