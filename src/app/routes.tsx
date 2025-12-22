import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/shared/layout/AdminLayout";

import Dashboard from "@/features/Dashboard/Pages/Dashboard"
import ProductPage from "@/features/Products/Pages/ProductPage";
import CategoryPage from "@/features/Cateogory/Page/CategoryPage";
import CategoriesContainer from "@/features/Cateogory/Page/CategoriesContainer";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/category" element={<CategoriesContainer />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
