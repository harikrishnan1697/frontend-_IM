import { BrowserRouter,Route,Routes} from "react-router-dom"
import Login from "./Component/Login"
import ProductReport from "./Component/ProductReport"
import Headers from "./Component/Headers"
import AddProduct from "./Component/AddProduct"
import SellsReport from "./Component/SellsReport"
import AddSells from "./Component/AddSells"
import Sellproduct from "./Component/Sellproduct"
import Editproduct from "./Component/Editproduct"


function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>} ></Route>
      <Route path="/productreport" element={<><Headers/><ProductReport/></>} ></Route>
      <Route path="/addproduct" element={<><Headers/><AddProduct/></>} ></Route>
      <Route path="/sellsreport" element={<><Headers/><SellsReport/></>} ></Route>
      <Route path="/addsells" element={<><Headers/><AddSells/></>} ></Route>
      <Route path="/sellproduct/:id" element={<><Sellproduct/></>}></Route>
      <Route path="/editproduct/:id" element={<><Editproduct/></>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
