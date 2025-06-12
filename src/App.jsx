import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import { IpManager, Login,MemberPoin, NotPound, TestPageComponents } from "./pages";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<MemberPoin />} title={'Lịch sử giao dịch'}/>
              <Route path="/ip-manager" element={<IpManager />} title={'Quản lý IP'}/>
              <Route path="/test-page-component" element={<TestPageComponents />} title={'Dev Page'}/>
            </Route>
          <Route path="*" element={<NotPound/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
};

export default App;
