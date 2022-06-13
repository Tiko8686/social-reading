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
import Posts from "../container/Posts/Posts";
import Category from "../container/Category/Category";
import Saved from "../container/Saved/Saved";
import Settings from "../container/Settings/Settings";
import PrivacePolicy from "../container/PrivacePolicy/PrivacePolicy";
import ForgotPass from "../container/ForgotPassword/ForgotPassword";
import EditProfile from "../container/EditProfile/EditProfile";
import CategoryPosts from "../container/CategoryPosts/CategoryPosts";


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
          <Route path="/confirm/:uid/:token/:code" element={<ForgotPass />} />
          <Route path="/profile" element={<Profile />} >
            <Route path="posts" element={<Posts />} />
            <Route path="category" element={<Category />}>
                <Route path=":name" element={<CategoryPosts/>}></Route>
            </Route>
            <Route path="saved" element={<Saved />} />
          </Route>
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/activate/:uid/:token" element={< VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default AllRoutes;
