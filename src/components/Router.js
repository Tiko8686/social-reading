import { BrowserRouter, Route, Routes } from "react-router-dom";
import Historical from "../container/Historical";
import Home from "../container/Home";
import Professional from "../container/Professional";
import Menu from "./Menu";

function AllRoutes() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/professional" element={<Professional />} />
          <Route path="/category/artistic" element={<Historical />} />
          <Route path="/category/historical " element={<Historical />} />
          <Route path="/category/motivational" element={<Historical />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default AllRoutes;
