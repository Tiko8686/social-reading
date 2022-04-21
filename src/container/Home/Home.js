import React, { useState, useEffect } from "react";
import "./home.css";
import Image from "./BookImg/Image"
function Home() {

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
          <Image/>
        </div>
        <div>
          <img src="http://localhost:3000/images/section_1.png" width="300px" />
        </div>
      </div>
    </>
  );
}

export default Home;
