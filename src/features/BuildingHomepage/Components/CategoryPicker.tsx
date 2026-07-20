import "./CategoryPicker.css";
import CategoryCard from "./CategoryCard";
import { useGetAllCategoriesQuery } from "@/redux/services/BuidHomeApi";

type Category = {
  _id: string;
  name: string;
};

type CategoryPickerProps = {
  activeCategoryId?: string | null;
  onCategoryAdd: (id: string, name: string) => void;
};

const CategoryPicker = ({ activeCategoryId, onCategoryAdd }: CategoryPickerProps) => {
  
  const { data, isLoading } = useGetAllCategoriesQuery();

  const categoryData: Category[] = data?.data ?? [];

  if (isLoading) {
    return <section className="build-home-card">Loading categories...</section>;
  }

  return (
    <section className="build-home-card">
      <div className="build-home-section-heading">
        <div>
          <h2>Select Category</h2>
          <p>Pick the category you want to configure.</p>
        </div>
        <span>{categoryData.length} available</span>
      </div>

      <div className="build-home-category-grid">
        {categoryData.map((c) => (
          <CategoryCard
            key={c._id}
            id={c._id}
            name={c.name}
            isActive={activeCategoryId === c._id}
            onAdd={onCategoryAdd}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryPicker;
