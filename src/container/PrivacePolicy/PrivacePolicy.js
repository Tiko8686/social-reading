import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PrivacePolicy() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const tokenGoogle = JSON.parse(localStorage.getItem("tokenGoogle"));
    const tokenFb = JSON.parse(localStorage.getItem("tokenFb"));

    if (!token && !tokenGoogle && !tokenFb) {
      navigate("/")
    }
  }, [])
  return (
    <>
      <div>
        <h1>PrivacePolicy</h1>
      </div>
    </>

  );
}

export default PrivacePolicy;
