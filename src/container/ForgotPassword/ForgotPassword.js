import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ForgotPass() {
    const params = useParams()
    console.log(params)
    const [data, setData] = useState({ code: "", password1: "", password2: "" })

    const send = (event) => {
        event.preventDefault()
        console.log(data)
        axios.post("http://192.168.1.103:8000/auth/users/reset_password_confirm/", {
            uid: params.uid,
            token: params.token,
            new_password: data.password1
        })
            .then(res => {
                console.log("act", res.data)
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
    return (
        <>
            <div>
                <h1>ForgotPass</h1>
                <form onSubmit={send}>
                    <div>
                        <input type="number" onChange={(e) => setData({ ...data, code: e.target.value })} value={data.code} />
                    </div>
                    <div>
                        <input type="password" onChange={(e) => setData({ ...data, password1: e.target.value })} value={data.password1} />
                    </div>
                    <div>
                        <input type="password" onChange={(e) => setData({ ...data, password2: e.target.value })} value={data.password2} />
                    </div>
                    <div>
                        <input type="submit" value="Reset password." id="send-btn" />
                    </div>
                </form>


            </div>

        </>
    );
}

export default ForgotPass;
