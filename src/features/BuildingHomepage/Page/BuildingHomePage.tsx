import "./BuildingHomePage.css";
import HomePageBuilderHeader from "../Components/HomePageBuilderHeader";
import CategoryPicker from '../Components/CategoryPicker';
import ProductPicker from '../Components/ProductPicker';
import HomePreview from '../Components/HomePreview';

const BuildingHomePage = () => {
  return (
    <div className="hp-layout">
      <HomePageBuilderHeader />
      <CategoryPicker />
      <ProductPicker />
      <HomePreview />
    </div>
  );
};

export default BuildingHomePage;
