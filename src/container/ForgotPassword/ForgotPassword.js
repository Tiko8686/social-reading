import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./forgotPassword.css"
function ForgotPass() {
    const navigate = useNavigate();


    const params = useParams()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [dataErr, setDataErr] = useState({ code: false, password2: false })
    const [password1Eye, setPassword1Eye] = useState(false)
    const [password2Eye, setPassword2Eye] = useState(false)

    const send = (data) => {
        if (data.password1 !== data.password2) {
            setDataErr({ ...dataErr, password2: true })
        }
        if (data.code !== params.code) {
            setDataErr({ ...dataErr, code: true })
        }
        if (data.password1 === data.password2 && data.code === params.code) {
            console.log(data)
            axios.post("https://www.socialreading.xyz/auth/users/reset_password_confirm/", {
                uid: params.uid,
                token: params.token,
                new_password: data.password1
            }).then(res => {
                console.log("act", res.data)
                navigate("/");
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
            <div className="forgot_pass_div">
                <h1>Enter New Password</h1>
                <p>Enter your verification code below to<br /> receive your password reset instruction</p>
                <form onSubmit={handleSubmit(send)} className="forgot_form">
                    <div>
                        <label>Confirmation Code</label>
                        <input
                            type="number"
                            onClick={() => setDataErr({ ...dataErr, code: false })
                            }
                            {...register("code", { required: true, minLength: 6, maxLength: 6 })}
                        />

                        {errors.code && errors.code.type === "required" && <span>This is required*</span>}
                        {errors.code && errors.code.type === "maxLength" && <span>Confirmation code length must be equal to 6.</span>}
                        {errors.code && errors.code.type === "minLength" && <span>Confirmation code length must be equal to 6.</span>}
                        {dataErr.code && <span>Code is wrong*</span>}
                    </div>
                    <div className="password_div_forgot">
                        <label>New Password</label>
                        <input
                            type={password1Eye ? "text" : "password"}
                            {...register("password1", { required: true, maxLength: 15, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/ })}
                        />
                        {password1Eye ?
                            <div className="password_eye_forgot" onClick={() => setPassword1Eye(false)}>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </div> :
                            <div className="password_eye_forgot" onClick={() => setPassword1Eye(true)}>
                               
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                </svg>
                               
                            </div>
                        }
                        {errors.password1 && errors.password1.type === "required" && <span>This is required*</span>}
                        {errors.password1 && errors.password1.type === "maxLength" && <span>Password can't be more than 15 characters*</span>}
                        {errors.password1 && errors.password1.type === "minLength" && <span>Password can't be less than 8 characters*</span>}
                        {errors.password1 && errors.password1.type === "pattern" && <span>Password must be containe uppercase, lowercase and number*</span>}
                    </div>
                    <div className="password_div_forgot">
                        <label>Confirm Password</label>
                        <input type={password2Eye ? "text" : "password"}
                            onClick={
                                () => setDataErr({ ...dataErr, password2: false })
                            }
                            {...register("password2", { required: true })}
                        />
                        {password2Eye ?
                            <div className="password_eye_forgot" onClick={() => setPassword2Eye(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </div> :
                            <div className="password_eye_forgot" onClick={() => setPassword2Eye(true)}>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                </svg>
                            </div>
                        }
                        {errors.password2 && errors.password2.type === "required" && <span>This is required*</span>}
                        {dataErr.password2 && <span>The password and confirmation password doesn't match*</span>}
                    </div>
                    <div>
                        <input type="submit" value="Submit" id="forgot_pass_btn_submit" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default ForgotPass;
