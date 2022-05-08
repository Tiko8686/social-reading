import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VerifyEmail() {
    const params = useParams()
    const navigate = useNavigate()
    console.log(params)
    useEffect(() => {
        axios.post("https://socialreading.xyz/auth/users/activation/",
            { uid: params.uid, token: params.token }
        ).then(resp => {
            console.log(resp.data)
            navigate("/")
            alert("Email verified. You can Login.")
        }).catch((error) => {
            if (error.response) {
                console.log("error.response ", error.response);
            } else if (error.request) {
                console.log("error.request ", error.request);
            } else if (error.message) {
                console.log("error.request ", error.message);
            }
            navigate("/")
            alert("Something went wrong.")

        });
    }, [])
    return (
        <>
            <div>
                <h1>Email activation​....</h1>
            </div>
        </>

    );
}

export default VerifyEmail;
