import ProductCard from "./ProductCard";
import { useGetProductBasicInfoByChildCategoryIdQuery } from "@/redux/services/BuidHomeApi";

export type Product = {
  _id: string;
  name: string;
  mrp: number;
  images?: string;
};

type ProductPickerProps = {
  categoryId: string;
  categoryName: string;
  onProductAdd: (product: Product) => void;
};

const ProductPicker = ({
  categoryId,
  categoryName,
  onProductAdd,
}: ProductPickerProps) => {
  console.log("this is cat id ", categoryId);

  const { data, isLoading } =
    useGetProductBasicInfoByChildCategoryIdQuery(categoryId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const products: Product[] =
    data?.data.map((p) => ({
      _id: p._id,
      name: p.name,
      mrp: p.mrp,
      images: p.images?.[0] ?? "",
    })) ?? [];

  return (
    <section className="hp-card">
      <h2>{categoryName} → Select Products (Max 6)</h2>

      <div className="hp-grid">
        {products.map((p) => (
          <ProductCard key={p._id} {...p} onAdd={() => onProductAdd(p)} />
        ))}
      </div>
    </section>
  );
};

export default ProductPicker;
