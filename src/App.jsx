import { BrowserRouter,Routes,Route } from "react-router-dom"
import { HomeKT, Login, MemberPoin } from "./pages"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/member-poin" element={<MemberPoin/>} />
        <Route path="/" element={<HomeKT/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App