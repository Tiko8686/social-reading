import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function VerifyEmail() {
    const params = useParams()
    console.log(params)
    useEffect(() => {
        axios.post("https://socialreading.xyz​/auth​/users​/activation​/",
            { uid: params.uid, token: params.token }
        ).then(resp => {
        console.log(resp.data)

        }).catch((error) => {
            if (error.response) {
                console.log("error.response ", error.response);
            } else if (error.request) {
                console.log("error.request ", error.request);
            } else if (error.message) {
                console.log("error.request ", error.message);
            }
        });
    }, [])
    return (
        <>
            <div >
                <h1>VerifyEmail</h1>
            </div>
        </>

    );
}

export default VerifyEmail;
