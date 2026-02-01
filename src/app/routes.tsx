import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/shared/layout/AdminLayout";

import Dashboard from "@/features/Dashboard/Pages/Dashboard";
import ProductPage from "@/features/Products/Pages/ProductPage";
import CategoryPage from "@/features/Cateogory/Page/CategoryPage";
import CategoriesContainer from "@/features/Cateogory/Page/CategoriesContainer";
import UnitPage from "@/features/Units/Pages/UnitPage";
import BrandPage from "@/features/Brand/Pages/BrandPage";
import ApproveUserPage from "@/features/ApproveUsers/Page/ApproveUserPage";
import UserDetailsPage from "@/features/ApproveUsers/Components/UserDetailsPage";
import CartInfoPage from "@/features/ApproveUsers/Components/CartInfo/CartInfoPage";
import OrderInfoPage from "@/features/ApproveUsers/Components/OrderInfo/OrderInfoPage";
import ShopInfoPage from "@/features/ApproveUsers/Components/ShopInfo/ShopInfoPage";
import BuildingHomePage from "@/features/BuildingHomepage/Page/BuildingHomePage";

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
        <Route path="/approveusers" element={<ApproveUserPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />}>
          <Route index element={<ShopInfoPage />} />
          <Route path="orderInfo" element={<OrderInfoPage />} />
          <Route path="cartInfo" element={<CartInfoPage />} />
        </Route>
        <Route path="buildHomepage" element={<BuildingHomePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
