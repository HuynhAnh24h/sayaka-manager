import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Login, MemberPoin,Dashboard,ProductDelivery, ProductManager, PackageProduct, Report, Warehourse } from "./pages"
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/product-delivery" element={<ProductDelivery/>} />
        <Route path="/product-manager" element={<ProductManager/>} />
        <Route path="/package-product" element={<PackageProduct/>} />
        <Route path="/report" element={<Report/>} />
        <Route path="/warehourse" element={<Warehourse/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/member-poin" element={<MemberPoin/>} />
        
      </Routes>
    </BrowserRouter>
     <ToastContainer position="top-right" autoClose={1500} />
    </>
  )
}

export default App