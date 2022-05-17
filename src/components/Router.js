import { BrowserRouter, Route, Routes } from "react-router-dom";
import Artistic from "../container/Artistic/Artistic";
import Historical from "../container/Historical/Historical";
import Home from "../container/Home/Home";
import Professional from "../container/Professional/Professional";
import Psychological from "../container/Psychological/Psychological";
import Motivation from "../container/Motivation/Motivation";
import { Menu } from "./Menu/Menu";
import AboutUs from "../container/AboutUs/AboutUs";
import VerifyEmail from "../container/VerifyEmail/VerifyEmail";
import Profile from "../container/Profile/Profile";
import Post from "../container/Post/Post";
import Category from "../container/Category/Category";
import Saved from "../container/Saved/Saved";
import Settings from "../container/Settings/Settings";
import PrivacePolicy from "../container/PrivacePolicy/PrivacePolicy";


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
          <Route path="/category/motivational" element={<Motivation />} />
          <Route path="/category/psychological" element={<Psychological />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/privacePolicy" element={<PrivacePolicy />} />
          <Route path="/profile" element={<Profile />} >
            <Route path="post" element={<Post />}/>
            <Route path="category" element={<Category />}/>
            <Route path="saved" element={<Saved />}/>
          </Route>
          <Route path="/activate/:uid/:token" element={< VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default AllRoutes;
