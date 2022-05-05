import React, { useEffect, useState } from "react";
import "./home.css";

function Home() {
  let [image, setImage] = useState([]);

  useEffect(() => {
    fetch("https://www.socialreading.xyz/quotes/")
      .then((response) => response.json())
      .then((response) => setImage(response));
  }, []);
  const getImgUrl = (array) => {
    let content = [];
    for (let link of array) {
      content.push(
        <div className="post__item">
          <div className="post__header">
            <div className="post__user">
              <div className="user_img">
                <img
                  className="user_img"
                  src={link.quote_file.replace(
                    "http://localhost:8000/",
                    "http://www.socialreading.xyz/"
                  )}
                />
              </div>
            </div>
            <div  className="user__name">
              <p className="name">Անուն Ազգանուն</p>
              <p className="time">1 շաբաթ առաջ</p>
            </div>
            <div className="post__time">
              <button>...</button>
            </div>
          </div>
          <div className="post__text">
            <p>
              Գրքի անուն, Հեղինակ Գրքի անուն, Հեղինակ Գրքի անուն, Հեղինակ Գրքի
              անուն, Հեղինակ Գրքի անուն, Հեղինա Գրքի անուն, Հեղինակ Գրքի անուն,
              Հեղինակ Գրքի անուն, Հեղինակ Գրքի անուն, Հեղինակ Գրքի անուն,
              Հեղինակ
            </p>
            {/* <p>{link.book_author}</p>
            <p>{link.book_title}</p>
            <p>{link.book_category}</p> */}
          </div>
          <div className="post__img">
            <img
              src={link.quote_file.replace(
                "http://localhost:8000/",
                "http://www.socialreading.xyz/"
              )}
              alt="img"
              width="1080px"
              height="1080px"
            />
          </div>
        </div>
      );
    }
    return content.reverse();
  };

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
            src="https://blooming-forest-92426.herokuapp.com/images/section_1.png"
            alt="img"
            width="300px"
            className="section_1_img"
          />
        </div>
      </div>
      <div className="section_2">
        <div className="img">{getImgUrl(image)}</div>
      </div>
    </>
  );
}

export default Home;