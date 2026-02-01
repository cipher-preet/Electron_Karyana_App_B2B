import "./CategoryPicker.css";
import CategoryCard from "./CategoryCard";

const categories = [
  "Electronics",
  "Fashion",
  "Mobiles",
  "Home Appliances",
  "Beauty",
  "Sports",
];

const CategoryPicker = () => {
  return (
    <section className="hp-card">
      <h2>Select Categories (Max 6)</h2>
      <div className="hp-grid">
        {categories.map((c) => (
          <CategoryCard key={c} name={c} />
        ))}
      </div>
    </section>
  );
};

export default CategoryPicker;
