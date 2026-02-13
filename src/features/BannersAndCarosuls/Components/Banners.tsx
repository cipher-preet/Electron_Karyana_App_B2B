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
    <>
      <div className="bc-upload-zone" onClick={() => inputRef.current?.click()}>
        <p>Click or drag image here to upload banner</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="bc-grid">
        {banners.map((b, i) => (
          <div className="bc-card" key={i}>
            <button
              className="bc-delete-icon"
              onClick={() =>
                setBanners((prev) => prev.filter((_, idx) => idx !== i))
              }
            >
              ✕
            </button>
            <img src={b.url} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Banners;
