import "./CategoryPicker.css";
import CategoryCard from "./CategoryCard";
import { useGetAllCategoriesQuery } from "@/redux/services/BuidHomeApi";

type Category = {
  _id: string;
  name: string;
};

type CategoryPickerProps = {
  onCategoryAdd: (id: string, name: string) => void;
};

const CategoryPicker = ({ onCategoryAdd }: CategoryPickerProps) => {
  
  const { data, isLoading } = useGetAllCategoriesQuery();

  const categoryData: Category[] = data?.data ?? [];

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <section className="hp-card">
      <h2>Select Categories (Max 6)</h2>

      <div className="hp-grid">
        {categoryData.map((c) => (
          <CategoryCard
            key={c._id}
            id={c._id}
            name={c.name}
            onAdd={onCategoryAdd}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryPicker;
