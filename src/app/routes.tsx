import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/shared/layout/AdminLayout";
import { lazy, Suspense } from "react";
import AppLoader from "@/shared/Apploader/AppLoader";


const Dashboard = lazy(() => import("@/features/Dashboard/Pages/Dashboard"));
const ProductPage = lazy(() => import("@/features/Products/Pages/ProductPage"));
const CategoriesContainer = lazy(() => import("@/features/Cateogory/Page/CategoriesContainer"));
const UnitPage = lazy(() => import("@/features/Units/Pages/UnitPage"));
const BrandPage = lazy(() => import("@/features/Brand/Pages/BrandPage"));
const ApproveUserPage = lazy(() => import("@/features/ApproveUsers/Page/ApproveUserPage"));
const UserDetailsPage = lazy(() => import("@/features/ApproveUsers/Components/UserDetailsPage"));
const CartInfoPage = lazy(() => import("@/features/ApproveUsers/Components/CartInfo/CartInfoPage"));
const OrderInfoPage = lazy(() => import("@/features/ApproveUsers/Components/OrderInfo/OrderInfoPage"));
const ShopInfoPage = lazy(() => import("@/features/ApproveUsers/Components/ShopInfo/ShopInfoPage"));
const BuildingHomePage = lazy(() => import("@/features/BuildingHomepage/Page/BuildingHomePage"));
const BannersAndCrouser = lazy(() => import("@/features/BannersAndCarosuls/Pages/BannersAndCrouser"));
const PendingApprovalUser = lazy(() => import("@/features/PendingApproveUsers/Page/PendingApprovalUser"));
const ApprovalUserPage = lazy(() => import("@/features/PendingApproveUsers/Components/ApprovalUserPage"));
const ProductInfoPage = lazy(() => import("@/features/Products/Components/ProductInfoPage/ProductInfoPage"));
const Contactus = lazy(() => import("@/features/ContactUsPage/Page/Contactus"));
const TagPages = lazy(() => import("@/features/TagSection/Pages/TagPages"));
const TrendPage = lazy(() => import("@/features/SetTrends/Pages/TrendPage"));
const TrendModulePage = lazy(() => import("@/features/TrendManagement/Pages/TrendModulePage"));
const OrderDetailPage = lazy(() => import("@/features/OrderDetailPage/Page/OrderDetailPage"));
const DeliveredOrdersPage = lazy(() => import("@/features/OrderDetailPage/Components/DeliveredOrdersPage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<AppLoader />}>
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/orderdetail" element={<OrderDetailPage />} />
        <Route path="/delivered-orders" element={<DeliveredOrdersPage />} />
        <Route path="/category" element={<CategoriesContainer />} />
        <Route path="/unit" element={<UnitPage />} />
        <Route path="/brandpage" element={<BrandPage />} />
        <Route path="/approveusers" element={<ApproveUserPage />} />
        <Route path="/users/:id/:actualUserId" element={<UserDetailsPage />}>
          <Route index element={<Navigate to="shop-info" replace />} />
          <Route path="shop-info" element={<ShopInfoPage />} />
          <Route path="orderInfo" element={<OrderInfoPage />} />
          <Route path="cartInfo" element={<CartInfoPage />} />
        </Route>
        <Route path="productInfo/:id" element={<ProductInfoPage />} />
        <Route path="buildHomepage" element={<BuildingHomePage />} />
        <Route path="bannersAndCrouser" element={<BannersAndCrouser />} />
        <Route path="pendingapprovaluser" element={<PendingApprovalUser />} />
        <Route path="/pendingusers/:id" element={<ApprovalUserPage />}></Route>
        <Route path="/contactus" element={<Contactus />}></Route>
        <Route path="/tags" element={<TagPages />}></Route>
        <Route path="/settrends" element={<TrendPage />}></Route>
        <Route path="/trendmanagement" element={<TrendModulePage />}></Route>
      </Route>
    </Routes>
    </Suspense>
  );
};

export default AppRoutes;
