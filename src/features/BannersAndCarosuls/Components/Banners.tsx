import { useRef } from "react";
import { MediaItem } from "../../../shared/types/types";

interface Props {
  banners: MediaItem[];
  setBanners: React.Dispatch<React.SetStateAction<MediaItem[]>>;
}

const Banners = ({ banners, setBanners }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newItems: MediaItem[] = Array.from(files).map((file) => ({
      type: "new",
      file,
      url: URL.createObjectURL(file),
    }));

    setBanners((prev) => [...prev, ...newItems]);
  };

  return (
    <section className="bc-panel">
      <div className="bc-upload-zone" onClick={() => inputRef.current?.click()}>
        <span className="bc-upload-icon">+</span>
        <div>
          <h3>Upload banners</h3>
          <p>Choose one or more wide promotional images.</p>
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

      {banners.length === 0 ? (
        <div className="bc-empty-state">No banners uploaded yet.</div>
      ) : (
        <div className="bc-grid">
          {banners.map((b, i) => (
            <div className="bc-card" key={i}>
              <button
                className="bc-delete-icon"
                aria-label="Delete banner"
                onClick={() =>
                  setBanners((prev) => prev.filter((_, idx) => idx !== i))
                }
              >
                x
              </button>
              <img src={b.url} alt={`Banner ${i + 1}`} />
              <div className="bc-card-footer">
                <span>Banner {i + 1}</span>
                <small>{b.type === "existing" ? "Saved" : "New"}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Banners;
