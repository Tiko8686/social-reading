import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./home.css";
function Home() {
  let [image, setImage] = useState([]);

    useEffect(() => {
        fetch("http://192.168.0.124:8000/quotes/")
            .then((response) => response.json())
            .then((response) => setImage(response));
    }, []);
    const getImgUrl = (array) => {
        let content = [];
        for (let link of array) {
            content.push(<div key={Date.now()}>
                <img src={link.quote_file} width='500px' height='500px' />
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
            <span className="ancolortxt"><br />միայնակ լինել:</span>
          </h1>
          <p>
            Ձեռքին լավ գիրք ունենալով, մարդ երբեք չի կարող միայնակ լինել: Ձեռքին
            լավ գիրք ունենալով, մարդ երբեք չի կարող միայնակ լինել:
          </p>
          <button className="seeAll">Իմանալ ավելին</button>
        </div>
        <div>
          <img src="http://localhost:3000/images/section_1.png" width="300px" />
        </div>
      </div>
      <div className="section_2">
        <div className="img">
            {getImgUrl(image)}
        </div>
      </div>
    </>
  );
}

export default Home;
