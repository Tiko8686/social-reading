import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate()
    // const [token, setToken] = useState("")
    useEffect(() => {
        const tokenn = JSON.parse(localStorage.getItem('token'));
        // setToken(tokenn)
        if (!tokenn) {
            navigate("/")
        }
        setInterval(() => {
        axios.post("https://socialreading.xyz/auth/djoser/jwt/refresh", { refresh: tokenn.refresh }).
            then(resp => {
                let a = "JWT " + resp.data.access
                axios.get("https://socialreading.xyz/auth/users/me", { headers: { "Authorization": a } })
                    .then(response => {
                        console.log("act", response.data)
                    }).catch((error) => {
                        if (error.response) {
                            console.log("error.response ", error.response);
                        } else if (error.request) {
                            console.log("error.request ", error.request);
                        } else if (error.message) {
                            console.log("error.request ", error.message);
                        }
                    });
                console.log(resp.data)
            }).catch((error) => {
                if (error.response) {
                    console.log("error.response ", error.response);
                    alert(error.response.data.email)
                } else if (error.request) {
                    console.log("error.request ", error.request);
                } else if (error.message) {
                    console.log("error.request ", error.message);
                }
            });
        }, 240000);
    }, [])
    useEffect(() => {

    }, []);
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
