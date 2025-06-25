import { BrowserRouter, Routes, Route } from "react-router-dom"
import PrivateRoute from "./components/common/PrivateRoute"
import { IpManager, Login,MemberPoin, NotPound, TestPageComponents } from "./pages"
import { ToastContainer } from "react-toastify"
import { useSelector } from "react-redux"
import { ModalProvider } from "./context/ModalContent"
const App = () => {
  const userRole = useSelector(state=>state.auth.position)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<MemberPoin />} title={'Lịch sử giao dịch'}/>
              {
                userRole === "Cashier" ? (<></>):(
                  <>
                    <Route path="/ip-manager" element={
                    <ModalProvider>
                      <IpManager />
                    </ModalProvider>
                    } title={'Quản lý IP'}/>
                    <Route path="/test-page-component" element={<TestPageComponents />} title={'Dev Page'}/>
                  </>
                )
              }
            </Route>
          <Route path="*" element={<NotPound/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
};

export default App;
