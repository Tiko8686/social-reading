import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "./forgotPassword.css"
function ForgotPass() {
    const params = useParams()
    console.log(params)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [dataErr, setDataErr] = useState({ code: false, password2: false })

    const send = (data) => {
        if (data.password1 !== data.password2) {
            setDataErr({ ...dataErr, password2: true })
        }
        if (data.code !== params.code) {
            setDataErr({ ...dataErr, code: true })
        }
        if (data.password1 === data.password2 && data.code === params.code) {
            console.log(data)
            axios.post("http://192.168.1.103:8000/auth/users/reset_password_confirm/", {
                uid: params.uid,
                token: params.token,
                new_password: data.password1
            }).then(res => {
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
            reset()
        }
    }
    return (
        <>
            <div>
                <h1>Enter New Password</h1>
                <form onSubmit={handleSubmit(send)} className="forgot_form">
                    <div>
                        <label>confirmation Code</label>
                        <input
                            type="number"
                            onClick={() => setDataErr({ ...dataErr, code: false })
                            }
                            {...register("code", { required: true })}
                        />
                        {errors.code && errors.code.type === "required" && <span>This is required*</span>}
                        {dataErr.code && <span>Code is wrong*</span>}

                    </div>
                    <div>
                        <label>New Password</label>
                        <input
                            type="password"
                            {...register("password1", { required: true, maxLength: 15, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/ })}
                        />
                        {errors.password1 && errors.password1.type === "required" && <span>This is required*</span>}
                        {errors.password1 && errors.password1.type === "maxLength" && <span>Password can't be more than 15 characters*</span>}
                        {errors.password1 && errors.password1.type === "minLength" && <span>Password can't be less than 8 characters*</span>}
                        {errors.password1 && errors.password1.type === "pattern" && <span>Password must be containe uppercase, lowercase and number*</span>}
                    </div>
                    <div>
                        <label>Confirm Password</label>

                        <input type="password"
                            onClick={
                                () => setDataErr({ ...dataErr, password2: false })
                            }
                            {...register("password2", { required: true })}
                        />
                        {errors.password2 && errors.password2.type === "required" && <span>This is required*</span>}
                        {dataErr.password2 && <span>The password and confirmation password doesn't match*</span>}
                    </div>
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>


            </div>

        </>
    );
}

export default ForgotPass;
