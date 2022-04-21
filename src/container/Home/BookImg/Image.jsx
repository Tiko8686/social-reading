import React, { useState, useEffect } from "react";
const Image = () => {

    let [image, setImage] = useState([]);

    useEffect(() => {
        fetch("http://192.168.0.124:8000/quotes/")
            .then((response) => response.json())
            .then((response) => setImage(response));
    }, []);
    // console.log(image);
    const getImgUrl = (array) => {
        let content = [];
        for (let link of array) {
            content.push(<div>
                <img src={link.quote} width='500px' height='500px' />
                <p>{link.author}</p>
            </div>);
        }
        return content.reverse();
    };
    return (
        <div>
            {getImgUrl(image)}
        </div>
    )
}

export default Image
