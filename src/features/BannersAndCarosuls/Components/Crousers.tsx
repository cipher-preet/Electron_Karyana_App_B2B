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
    <>
      <div className="bc-upload-zone" onClick={() => inputRef.current?.click()}>
        <p>Click or drag image here to upload carousel</p>
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
        {carousels.map((c, i) => (
          <div className="bc-card" key={i}>
            <button
              className="bc-delete-icon"
              onClick={() =>
                setCarousels((prev) => prev.filter((_, idx) => idx !== i))
              }
            >
              ✕
            </button>
            <img src={c.url} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Carousels;
