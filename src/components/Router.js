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
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default MyRoute;
