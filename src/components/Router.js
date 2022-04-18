import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Historical from "../container/Historical";

import Home from "../container/Home/Home";
import Masnagitakan from "../container/Masnagitakan";
import Menu from "./Menu";

function MyRoute() {
  return (
    <>
   
    <BrowserRouter>
    <Menu></Menu>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/professional" element={<Historical/>} />
          <Route path="/category/artistic" element={<Historical/>} />
          <Route path="/category/historical "element={<Masnagitakan />} />
          <Route path="/category/motivational" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default MyRoute;
