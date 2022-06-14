import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./category.css"
function Category() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  // const [cat, setCat] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      getCategories()
    } else {
      navigate("/")
    }
  }, [])

  function getCategories() {
    const user = JSON.parse(localStorage.getItem("user"))
    axios.get("https://www.socialreading.xyz/categories/?users=" + user?.id).
      then(resp => {
        console.log(resp.data);
        setCategories(resp.data)
      }).catch((error) => {
        if (error.response) {
          console.log("error.response ", error.response);
        } else if (error.request) {
          console.log("error.request ", error.request);
        } else if (error.message) {
          console.log("error.request ", error.message);
        }
      });
  }
  // console.log(cat);
  return (
    <>
      <div className="my_categories">
        {
          categories?.map(category => {
            return (
              <div className="category_name" key={category?.id}
              // onClick={() => setCat(category?.id)}
              >
                <Link to={category?.name}
                // style={cat === category?.id ? { color: "red" } : { color: "#202029" }}
                >{category?.name}
                </Link>
                <button onClick={() => {
                }}>Delete Category</button>
              </div>
            )

          })
        }
      </div>
      <Outlet />
    </>

  );
}

export default Category