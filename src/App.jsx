import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import { Login, Dashboard, ProductDelivery, ProductManager, PackageProduct, Report, Warehourse, MemberPoin, NotPound } from "./pages";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/product-delivery" element={<ProductDelivery />} />
              <Route path="/product-manager" element={<ProductManager />} />
              <Route path="/package-product" element={<PackageProduct />} />
              <Route path="/report" element={<Report />} />
              <Route path="/warehourse" element={<Warehourse />} />
              <Route path="/member-poin" element={<MemberPoin />} />
            </Route>
          <Route path="*" element={<NotPound/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
};

export default App;
