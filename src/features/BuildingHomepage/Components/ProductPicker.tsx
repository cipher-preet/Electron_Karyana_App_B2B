import "./ProductPicker.css";
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
  const { data, isLoading } =
    useGetProductBasicInfoByChildCategoryIdQuery(categoryId);

  const getImageUrl = (images?: string | string[]) => {
    if (Array.isArray(images)) return images[0] ?? "";
    return images ?? "";
  };

  if (isLoading) {
    return <section className="build-home-card">Loading products...</section>;
  }

  const products: Product[] =
    data?.data.map((p) => ({
      _id: p._id,
      name: p.name,
      mrp: p.mrp,
      images: getImageUrl(p.images),
    })) ?? [];

  return (
    <section className="build-home-card">
      <div className="build-home-section-heading">
        <div>
          <h2>{categoryName}</h2>
          <p>Select up to 6 products for this homepage section.</p>
        </div>
        <span>{products.length} products</span>
      </div>

      <div className="build-home-product-grid">
        {products.map((p) => (
          <ProductCard key={p._id} {...p} onAdd={() => onProductAdd(p)} />
        ))}
      </div>
    </section>
  );
};

export default ProductPicker;
