import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            navigate("/")
        }
    }, [])
    return (
        <>
            <div>
                <h1>Profile</h1>

                <button onClick={() => {
                    localStorage.removeItem("token")
                    navigate("/")
                }}>Log out</button>
            </div>
        </>


    );
}

export default Profile;
