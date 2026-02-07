import { useRef, useState } from "react";

interface CarouselsProps {
  carousels: string[];
}

const Carousels = ({ carousels }: CarouselsProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [localCarousels, setLocalCarousels] = useState<string[]>(carousels);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const previews = Array.from(files).map((file) => URL.createObjectURL(file));

    setLocalCarousels((prev) => [...prev, ...previews]);

    console.log("Upload carousels:", files);
  };

  return (
    <div>
      <div
        className="bc-upload-zone"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        <p>Click or drag image here to upload carousel</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="bc-grid">
        {localCarousels.filter(Boolean).map((url, index) => (
          <div className="bc-card" key={`${url}-${index}`}>
            <button
              className="bc-delete-icon"
              onClick={() =>
                setLocalCarousels((prev) => prev.filter((item) => item !== url))
              }
            >
              ✕
            </button>

            <img src={url} alt={`carousel-${index}`} />
          </div>
        ))}
      </div>

      <div className="bc-proceed">
        <button
          onClick={() => console.log("Proceed carousels", localCarousels)}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Carousels;
