import React, { useEffect, useState } from "react";
import "./home.css";

function Home() {
  let [post, setPost] = useState([]);
  let [token, setToken] = useState([]);

  console.log(post)
  useEffect(() => {
    fetch("https://www.socialreading.xyz/quotes/")
      .then((response) => response.json())
      .then((response) => {
        setPost(response);
      });
    // const tokenn = JSON.parse(localStorage.getItem("token"));
    // const tokenGoogle = JSON.parse(localStorage.getItem("tokenGoogle"));
    // const tokenFb = JSON.parse(localStorage.getItem("tokenFb"));
    // if (tokenn) {
    //   setToken(tokenn)
    // } else if (tokenGoogle) {
    //   setToken(tokenGoogle)
    // } else if (tokenFb) {
    //   setToken(tokenFb)
    // } else {
    //   setToken("")
    // }
  }, []);

  return (
    <>
      <div className="section_1">
        <div className="hometext">
          <h1>
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
            src="https://social-reading-application.herokuapp.com/images/section_1.png"
            alt="img"
            width="300px"
            className="section_1_img"
          />
        </div>
      </div>
      <div className="section_2">
        {
          post.map(e => {
            return (
              <div className="post__item" key={e.id}>
                <div className="post__header">
                  <div className="post__user">
                    <div className="user_img">
                      <img
                        className="user_img"
                        src={e?.author?.avatar}
                      />
                    </div>
                    <div className="user__name">
                      <p className="name">{e?.author?.first_name} {e?.author?.last_name}</p>
                      <p className="time">{e?.date_posted}</p>
                    </div>
                  </div>
                  <div className="post__time">
                    <button>...</button>
                  </div>
                </div>
                <div className="post__text">
                  {e?.quote_text}
                </div>
                <div className="post__img">
                  <img
                    src={e?.quote_file}
                    width="100%"
                    alt="img"
                  />
                </div>
               
              </div>
            )
          })
        }

      </div>
    </>
  );
}

export default Home;