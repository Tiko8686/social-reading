import React, { useEffect, useState } from "react";
import "./home.css";

function Home() {
  let [image, setImage] = useState([]);


  useEffect(() => {
    fetch("http://www.socialreading.xyz/quotes/")
      .then((response) => response.json())
      .then((response) => setImage(response));
  }, []);
  const getImgUrl = (array) => {
    let content = [];
    for (let link of array) {
      content.push(<div key={Date.now()}>
        <img src={link.quote_file.replace("http://localhost:8000", "http://www.socialreading.xyz")} width='500px' height='500px' />
        <p>{link.book_author}</p>
        <p>{link.book_title}</p>
        <p>{link.book_category}</p>
      </div>);
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
          <img src="http://localhost:3000/images/section_1.png" width="300px" className="section_1_img"/>
        </div>
      </div>
      <div className="section_2" >
        <div className="img" >
            {getImgUrl(image)}
        </div>
        <div className="section_2">
          {getImgUrl(image)}
        </div>
      </div>
    </>
  );
}

export default Home;
