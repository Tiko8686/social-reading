import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../container/Home/Home";
import Menu from "./Menu";

function MyRoute() {
  return (
    <>
   
    <BrowserRouter>
    <Menu></Menu>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/historical" element={<Home />} />
          <Route path="/category/artistic" element={<Home />} />
          <Route path="/category/historical "element={<Home />} />
          <Route path="/category/motivational" element={<Home />} />
        </Routes>
  
      </BrowserRouter>
    </>
  );
}
export default MyRoute;
