import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/shared/layout/AdminLayout";

import Dashboard from "@/features/Dashboard/Pages/Dashboard"
import ProductPage from "@/features/Products/Pages/ProductPage";
import CategoryPage from "@/features/Cateogory/Page/CategoryPage";
import CategoriesContainer from "@/features/Cateogory/Page/CategoriesContainer";
import UnitPage from "@/features/Units/Pages/UnitPage";
import BrandPage from "@/features/Brand/Pages/BrandPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/category" element={<CategoriesContainer />} />
        <Route path="/unit" element={<UnitPage />} />
        <Route path="/brandpage" element={<BrandPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
