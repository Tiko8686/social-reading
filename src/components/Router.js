import { BrowserRouter, Route, Routes } from "react-router-dom";
import Artistic from "../container/Artistic/Artistic";
import Historical from "../container/Historical/Historical";
import Home from "../container/Home/Home";
import Professional from "../container/Professional/Professional";
import Psychological from "../container/Psychological/Psychological";
import Motivation from "../container/Motivation/Motivation";

import Menu from "./Menu";

function AllRoutes() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/professional" element={<Professional />} />
          <Route path="/category/artistic" element={<Artistic />} />
          <Route path="/category/historical" element={<Historical />} />
          <Route path="/category/motivational" element={<Motivation/>} />
          <Route path="/category/psychological" element={<Psychological />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default AllRoutes;
