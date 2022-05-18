import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import "./EditProfile.css"

function EditProfile() {
    const { register, handleSubmit, setValue } = useForm()
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        const token = JSON.parse(localStorage.getItem("token"))
        setUser("JWT " + token.access)
        setValue("first_name", user.first_name)
        setValue("last_name", user.last_name)
    }, [])

    const onSubmit = (data) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);

        if (data.avatar.length > 0) {
            formData.append("avatar", data.avatar[0]);
        }
        if (data.profile_background.length > 0) {
            formData.append("profile_background", data.profile_background[0]);
        }

        axios.put('https://socialreading.xyz/auth/users/me/', formData, {
            headers: { "Authorization": user }
        }).then(resp => {
            console.log("respo", resp)
            localStorage.setItem('user', JSON.stringify(resp.data));
            setLoading(false)

        })

    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <p>First Name</p>
                <input {...register("first_name")} /><br />
                <p>Last Name</p>
                <input {...register("last_name")} /><br /><br />
                <p>Avatar</p>
                <input type="file" {...register("avatar")} /><br /><br />
                <p>Background</p>
                <input type="file" {...register("profile_background")} /><br /><br />
                <input type="submit" />
            </form>
            {
                loading && <p>...</p>
            }


        </div >
    )
}

export default EditProfile