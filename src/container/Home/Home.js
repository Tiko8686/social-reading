import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Post from "../../components/Post/Post";
import logo from "./../../assets/images/logo_home.png"
function Home() {
  const navigate = useNavigate()
  const [post, setPost] = useState([]);


  //create user and token
  useEffect(() => {
    fetch("https://www.socialreading.xyz/quotes/")
      .then((response) => response.json())
      .then((response) => {
        setPost(response);
      });
  }, [navigate]);

  console.log(post);
  return (
    <div
    >
      <div className="section_1">
        <div className="hometext">
          <h1 style={{ fontFamily: "Candara Light Italic" }} >
            Ձեռքին լավ գիրք ունենալով, մարդ երբեք չի կարող
            <span className="ancolortxt"> միայնակ լինել:</span>
          </h1>
          <p>
            Ձեռքին լավ գիրք ունենալով, մարդ երբեք չի կարող միայնակ լինել: Ձեռքին
            լավ գիրք ունենալով, մարդ երբեք չի կարող միայնակ լինել:
          </p>
          <button className="seeAll">Իմանալ ավելին</button>
        </div>
        <div>
          <img
            src={logo}
            alt="img"
            width="300px"
            className="section_1_img"
          />
        </div>
      </div>

      <div className="section_2">
        {
          post.map(post => {
            return (
              post?.published && <Post post={post} setPost={setPost} key={post?.id} />
            )
          })
        }
      </div>
    </div>
  );
}
export default Home;








