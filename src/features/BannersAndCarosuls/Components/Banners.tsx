import { useRef, useState } from "react";

interface BannersProps {
  banners: string[];
}

const Banners = ({ banners }: BannersProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [localBanners, setLocalBanners] = useState<string[]>(banners);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const previews = Array.from(files).map((file) => URL.createObjectURL(file));

    setLocalBanners((prev) => [...prev, ...previews]);

    console.log("Upload banners:", files);
  };

  return (
    <div>
      {/* Upload Zone */}
      <div
        className="bc-upload-zone"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        <p>Click or drag image here to upload banner</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Banners */}
      <div className="bc-grid">
        {localBanners.filter(Boolean).map((url, index) => (
          <div className="bc-card" key={`${url}-${index}`}>
            <button
              className="bc-delete-icon"
              onClick={() =>
                setLocalBanners((prev) => prev.filter((item) => item !== url))
              }
            >
              ✕
            </button>

            <img src={url} alt={`banner-${index}`} />
          </div>
        ))}
      </div>

      {/* Proceed */}
      <div className="bc-proceed">
        <button onClick={() => console.log("Proceed banners", localBanners)}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Banners;
