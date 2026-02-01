import "./PreviewSection.css";

const PreviewSection = ({title}) => {
  return (
    <div className="preview-section">
      <h3>{title}</h3>
      <div className="preview-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="preview-card" />
        ))}
      </div>
    </div>
  )
}

export default PreviewSection
